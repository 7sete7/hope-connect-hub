import db from "../db";
import { requireAuth } from "../middleware/auth";

export async function handleColors(req: Request): Promise<Response> {
  if (req.method === "GET") {
    const row = db.query("SELECT * FROM site_colors WHERE id = 1").get() as any;
    if (!row) return Response.json({});
    return Response.json({
      primary: row.primary,
      secondary: row.secondary,
      accent: row.accent,
    });
  }

  if (req.method === "PUT") {
    const auth = await requireAuth(req);
    if (auth instanceof Response) return auth;

    const body = await req.json();
    db.query(`UPDATE site_colors SET 
      "primary" = COALESCE(?, "primary"),
      secondary = COALESCE(?, secondary),
      accent = COALESCE(?, accent)
      WHERE id = 1`).run(
      body.primary ?? null, body.secondary ?? null, body.accent ?? null
    );
    return handleColors(new Request(req.url, { method: "GET" }));
  }

  return Response.json({ error: "Método não permitido" }, { status: 405 });
}
