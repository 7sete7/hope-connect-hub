import { resolve } from "path";
import { requireAuth } from "../middleware/auth";

const UPLOAD_DIR = process.env.UPLOAD_DIR || resolve(import.meta.dir, "../../uploads");

export async function handleUpload(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ error: "Método não permitido" }, { status: 405 });
  }

  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowedTypes.includes(file.type)) {
    return Response.json({ error: "Tipo de arquivo não permitido" }, { status: 400 });
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ error: "Arquivo muito grande (máx 5MB)" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const filepath = resolve(UPLOAD_DIR, filename);

  await Bun.write(filepath, file);

  const url = `/uploads/${filename}`;
  return Response.json({ url }, { status: 201 });
}
