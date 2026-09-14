import db from "../db";
import { requireAuth } from "../middleware/auth";

export async function handleGeneral(req: Request): Promise<Response> {
  if (req.method === "GET") {
    const row = db.query("SELECT * FROM general_settings WHERE id = 1").get() as any;
    if (!row) return Response.json({});
    return Response.json({
      siteTitle: row.site_title,
      tagline: row.tagline,
      introTitle: row.intro_title,
      introText: row.intro_text,
    });
  }

  if (req.method === "PUT") {
    const auth = await requireAuth(req);
    if (auth instanceof Response) return auth;

    const body = await req.json();
    db.query(`UPDATE general_settings SET
      site_title = COALESCE(?, site_title),
      tagline = COALESCE(?, tagline),
      intro_title = COALESCE(?, intro_title),
      intro_text = COALESCE(?, intro_text)
      WHERE id = 1`).run(
      body.siteTitle ?? null,
      body.tagline ?? null,
      body.introTitle ?? null,
      body.introText ?? null
    );
    return handleGeneral(new Request(req.url, { method: "GET" }));
  }

  return Response.json({ error: "Método não permitido" }, { status: 405 });
}
