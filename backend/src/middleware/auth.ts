import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "cooperativa-secret-change-in-production");

export async function verifyAuth(req: Request): Promise<{ userId: string } | null> {
  const header = req.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) return null;

  try {
    const token = header.slice(7);
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { userId: payload.sub as string };
  } catch {
    return null;
  }
}

export async function requireAuth(req: Request): Promise<Response | { userId: string }> {
  const auth = await verifyAuth(req);
  if (!auth) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  return auth;
}
