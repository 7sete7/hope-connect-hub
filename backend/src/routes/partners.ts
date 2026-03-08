import db from "../db";
import { requireAuth } from "../middleware/auth";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export async function handlePartners(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts[2] || null;

  if (req.method === "GET") {
    if (id) {
      const partner = db.query("SELECT * FROM partners WHERE id = ?").get(id);
      return partner ? Response.json(partner) : Response.json({ error: "Não encontrado" }, { status: 404 });
    }
    return Response.json(db.query("SELECT * FROM partners ORDER BY name").all());
  }

  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;

  if (req.method === "POST") {
    const body = await req.json();
    const newId = generateId();
    db.query("INSERT INTO partners (id, name, logo, whatsapp, website) VALUES (?, ?, ?, ?, ?)").run(
      newId, body.name, body.logo, body.whatsapp || null, body.website || null
    );
    return Response.json(db.query("SELECT * FROM partners WHERE id = ?").get(newId), { status: 201 });
  }

  if (req.method === "PUT" && id) {
    const body = await req.json();
    const existing = db.query("SELECT * FROM partners WHERE id = ?").get(id) as any;
    if (!existing) return Response.json({ error: "Não encontrado" }, { status: 404 });
    db.query("UPDATE partners SET name = ?, logo = ?, whatsapp = ?, website = ? WHERE id = ?").run(
      body.name ?? existing.name, body.logo ?? existing.logo, body.whatsapp ?? existing.whatsapp, body.website ?? existing.website, id
    );
    return Response.json(db.query("SELECT * FROM partners WHERE id = ?").get(id));
  }

  if (req.method === "DELETE" && id) {
    db.query("DELETE FROM partners WHERE id = ?").run(id);
    return new Response(null, { status: 204 });
  }

  return Response.json({ error: "Método não permitido" }, { status: 405 });
}
