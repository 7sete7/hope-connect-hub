import db from "../db";
import { requireAuth } from "../middleware/auth";

export async function handleAbout(req: Request): Promise<Response> {
  if (req.method === "GET") {
    const row = db.query("SELECT * FROM about WHERE id = 1").get() as any;
    if (!row) return Response.json({});
    return Response.json({
      intro: row.intro,
      introImage: row.intro_image,
      mission: row.mission,
      missionImage: row.mission_image,
      vision: row.vision,
      visionImage: row.vision_image,
      values: row.values,
      valuesImage: row.values_image,
    });
  }

  if (req.method === "PUT") {
    const auth = await requireAuth(req);
    if (auth instanceof Response) return auth;

    const body = await req.json();
    db.query(`UPDATE about SET 
      intro = COALESCE(?, intro), intro_image = COALESCE(?, intro_image),
      mission = COALESCE(?, mission), mission_image = COALESCE(?, mission_image),
      vision = COALESCE(?, vision), vision_image = COALESCE(?, vision_image),
      "values" = COALESCE(?, "values"), values_image = COALESCE(?, values_image)
      WHERE id = 1`).run(
      body.intro ?? null, body.introImage ?? null,
      body.mission ?? null, body.missionImage ?? null,
      body.vision ?? null, body.visionImage ?? null,
      body.values ?? null, body.valuesImage ?? null
    );
    // Re-fetch and return
    return handleAbout(new Request(req.url, { method: "GET" }));
  }

  return Response.json({ error: "Método não permitido" }, { status: 405 });
}
