# Dependências instaladas na arquitetura de quem builda (jose é JS puro),
# evitando rodar o Bun emulado ao gerar a imagem linux/amd64 num Mac arm64.
FROM --platform=$BUILDPLATFORM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

FROM oven/bun:1
WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create data and uploads directories
RUN mkdir -p /app/data /app/uploads

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["bun", "-e", "fetch('http://localhost:3001/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

# Migrations e seed rodam a cada start, sobre o volume persistente:
# migrate aplica só as pendentes e o seed só popula um banco vazio.
CMD ["sh", "-c", "bun run migrate.ts && bun run seed.ts && exec bun run src/index.ts"]
