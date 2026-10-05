import db from "../db";
import { requireAuth } from "../middleware/auth";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export async function handleContact(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  // POST /api/contact/message — public contact form submission
  if (req.method === "POST" && path.endsWith("/message")) {
    const body = await req.json().catch(() => ({}));
    const field = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
    const name = field(body.name, 200);
    const email = field(body.email, 200);
    const message = field(body.message, 5000);
    if (!name || !email || !message) {
      return Response.json({ error: "Nome, email e mensagem são obrigatórios" }, { status: 400 });
    }
    db.query("INSERT INTO contact_messages (id, name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)").run(
      generateId(), name, email, field(body.phone, 50) || null, field(body.subject, 200) || null, message
    );
    return Response.json({ success: true }, { status: 201 });
  }

  // GET/DELETE /api/contact/messages[/:id] — admin inbox (auth required)
  if (path.startsWith("/api/contact/messages")) {
    const auth = await requireAuth(req);
    if (auth instanceof Response) return auth;
    const id = path.split("/").filter(Boolean)[3] || null;

    if (req.method === "GET" && !id) {
      const rows = db.query("SELECT * FROM contact_messages ORDER BY created_at DESC").all() as any[];
      return Response.json(rows.map((r) => ({ ...r, createdAt: r.created_at, created_at: undefined })));
    }
    if (req.method === "DELETE" && id) {
      db.query("DELETE FROM contact_messages WHERE id = ?").run(id);
      return new Response(null, { status: 204 });
    }
    return Response.json({ error: "Método não permitido" }, { status: 405 });
  }

  // GET /api/contact — get contact settings
  if (req.method === "GET") {
    const row = db.query("SELECT * FROM contact_settings WHERE id = 1").get() as any;
    if (!row) return Response.json({});
    return Response.json({
      whatsappNumber: row.whatsapp_number,
      email: row.email,
      phone: row.phone,
      address: row.address,
    });
  }

  // PUT /api/contact — update contact settings (auth required)
  if (req.method === "PUT") {
    const auth = await requireAuth(req);
    if (auth instanceof Response) return auth;

    const body = await req.json();
    db.query(`UPDATE contact_settings SET 
      whatsapp_number = COALESCE(?, whatsapp_number),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      address = COALESCE(?, address)
      WHERE id = 1`).run(
      body.whatsappNumber ?? null, body.email ?? null, body.phone ?? null, body.address ?? null
    );
    return handleContact(new Request(req.url, { method: "GET" }));
  }

  return Response.json({ error: "Método não permitido" }, { status: 405 });
}
