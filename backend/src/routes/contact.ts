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
    const body = await req.json();
    const id = generateId();
    db.query("INSERT INTO contact_messages (id, name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)").run(
      id, body.name, body.email, body.phone || null, body.subject || null, body.message
    );
    return Response.json({ success: true }, { status: 201 });
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
