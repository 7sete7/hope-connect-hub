import { handleSlides } from "./routes/slides";
import { handleEvents } from "./routes/events";
import { handlePartners } from "./routes/partners";
import { handleAbout } from "./routes/about";
import { handleContact } from "./routes/contact";
import { handleColors } from "./routes/colors";
import { handleGeneral } from "./routes/general";
import { handleAuth } from "./routes/auth";
import { handleUpload } from "./routes/upload";
import { resolve } from "path";

const PORT = Number(process.env.PORT) || 3001;
const UPLOAD_DIR = process.env.UPLOAD_DIR || resolve(import.meta.dir, "../uploads");
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || "http://localhost:8080,http://localhost:80").split(",");

function corsHeaders(origin?: string | null): HeadersInit {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function withCors(response: Response, origin?: string | null): Response {
  const headers = corsHeaders(origin);
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }
  return response;
}

function route(pathname: string): ((req: Request) => Promise<Response>) | null {
  if (pathname.startsWith("/api/slides")) return handleSlides;
  if (pathname.startsWith("/api/events")) return handleEvents;
  if (pathname.startsWith("/api/partners")) return handlePartners;
  if (pathname.startsWith("/api/about")) return handleAbout;
  if (pathname.startsWith("/api/contact")) return handleContact;
  if (pathname.startsWith("/api/colors")) return handleColors;
  if (pathname.startsWith("/api/general")) return handleGeneral;
  if (pathname === "/api/auth/login") return handleAuth;
  if (pathname === "/api/upload") return handleUpload;
  return null;
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const origin = req.headers.get("Origin");

    if (req.method === "OPTIONS") {
      return withCors(new Response(null, { status: 204 }), origin);
    }

    if (url.pathname.startsWith("/uploads/")) {
      const filePath = resolve(UPLOAD_DIR, decodeURIComponent(url.pathname.slice("/uploads/".length)));
      const file = Bun.file(filePath);
      if (filePath.startsWith(resolve(UPLOAD_DIR) + "/") && (await file.exists())) {
        return withCors(new Response(file), origin);
      }
      return withCors(Response.json({ error: "Arquivo não encontrado" }, { status: 404 }), origin);
    }

    const handler = route(url.pathname);
    if (handler) {
      try {
        const response = await handler(req);
        return withCors(response, origin);
      } catch (err) {
        console.error("Server error:", err);
        return withCors(Response.json({ error: "Erro interno do servidor" }, { status: 500 }), origin);
      }
    }

    if (url.pathname === "/api/health") {
      return withCors(Response.json({ status: "ok", timestamp: new Date().toISOString() }), origin);
    }

    return withCors(Response.json({ error: "Rota não encontrada" }, { status: 404 }), origin);
  },
});

console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
