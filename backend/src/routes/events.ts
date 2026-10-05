import db from "../db";
import { requireAuth, verifyAuth } from "../middleware/auth";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export async function handleEvents(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts[2] || null;

  if (req.method === "GET") {
    // Rascunhos só são visíveis para o admin autenticado
    const onlyPublished = url.searchParams.get("status") === "published" || !(await verifyAuth(req));
    if (id) {
      const event = db.query("SELECT * FROM events WHERE id = ?").get(id) as any;
      if (!event || (onlyPublished && event.status !== "published")) return Response.json({ error: "Não encontrado" }, { status: 404 });
      return Response.json(event);
    }
    if (onlyPublished) {
      return Response.json(db.query("SELECT * FROM events WHERE status = 'published' ORDER BY date DESC").all());
    }
    return Response.json(db.query("SELECT * FROM events ORDER BY date DESC").all());
  }

  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;

  if (req.method === "POST") {
    const body = await req.json();
    if (!body.title || !body.content || !body.image || !body.date) {
      return Response.json({ error: "Título, conteúdo, imagem e data são obrigatórios" }, { status: 400 });
    }
    const newId = generateId();
    db.query("INSERT INTO events (id, title, content, image, date, status) VALUES (?, ?, ?, ?, ?, ?)").run(
      newId, body.title, body.content, body.image, body.date, body.status || "draft"
    );
    return Response.json(db.query("SELECT * FROM events WHERE id = ?").get(newId), { status: 201 });
  }

  if (req.method === "PUT" && id) {
    const body = await req.json();
    const existing = db.query("SELECT * FROM events WHERE id = ?").get(id) as any;
    if (!existing) return Response.json({ error: "Não encontrado" }, { status: 404 });
    db.query("UPDATE events SET title = ?, content = ?, image = ?, date = ?, status = ? WHERE id = ?").run(
      body.title ?? existing.title, body.content ?? existing.content, body.image ?? existing.image,
      body.date ?? existing.date, body.status ?? existing.status, id
    );
    return Response.json(db.query("SELECT * FROM events WHERE id = ?").get(id));
  }

  if (req.method === "DELETE" && id) {
    db.query("DELETE FROM events WHERE id = ?").run(id);
    return new Response(null, { status: 204 });
  }

  return Response.json({ error: "Método não permitido" }, { status: 405 });
}
