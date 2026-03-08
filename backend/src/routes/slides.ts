import db from "../db";
import { requireAuth } from "../middleware/auth";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export async function handleSlides(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean); // ["api", "slides", ":id?"]
  const id = parts[2] || null;

  if (req.method === "GET") {
    if (id) {
      const slide = db.query("SELECT * FROM slides WHERE id = ?").get(id);
      return slide ? Response.json(slide) : Response.json({ error: "Não encontrado" }, { status: 404 });
    }
    const slides = db.query('SELECT * FROM slides ORDER BY "order" ASC').all();
    return Response.json(slides);
  }

  // All other methods require auth
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;

  if (req.method === "POST") {
    const body = await req.json();
    const newId = generateId();
    db.query('INSERT INTO slides (id, image, title, subtitle, "order") VALUES (?, ?, ?, ?, ?)').run(
      newId, body.image, body.title || null, body.subtitle || null, body.order ?? 0
    );
    const slide = db.query("SELECT * FROM slides WHERE id = ?").get(newId);
    return Response.json(slide, { status: 201 });
  }

  if (req.method === "PUT" && id) {
    const body = await req.json();
    const existing = db.query("SELECT * FROM slides WHERE id = ?").get(id) as any;
    if (!existing) return Response.json({ error: "Não encontrado" }, { status: 404 });
    db.query('UPDATE slides SET image = ?, title = ?, subtitle = ?, "order" = ? WHERE id = ?').run(
      body.image ?? existing.image, body.title ?? existing.title, body.subtitle ?? existing.subtitle, body.order ?? existing.order, id
    );
    return Response.json(db.query("SELECT * FROM slides WHERE id = ?").get(id));
  }

  if (req.method === "DELETE" && id) {
    db.query("DELETE FROM slides WHERE id = ?").run(id);
    return new Response(null, { status: 204 });
  }

  return Response.json({ error: "Método não permitido" }, { status: 405 });
}
