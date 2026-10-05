import { SignJWT } from "jose";
import db from "../db";
import { JWT_SECRET } from "../middleware/auth";
const TOKEN_EXPIRY = "24h";

export async function handleAuth(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ error: "Método não permitido" }, { status: 405 });
  }

  const body = await req.json().catch(() => ({}));
  const { email, password } = body;

  if (!email || !password) {
    return Response.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
  }

  // Email sem diferenciar maiúsculas/espaços (teclados de celular capitalizam e autocompletam com espaço)
  const user = db.query("SELECT * FROM users WHERE lower(email) = lower(?)").get(String(email).trim()) as any;
  if (!user) {
    return Response.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const valid = await Bun.password.verify(password, user.password_hash);
  if (!valid) {
    return Response.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const token = await new SignJWT({ sub: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  return Response.json({ token });
}
