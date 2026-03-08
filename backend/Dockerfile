FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile || bun install

# Copy source
COPY . .

# Create data and uploads directories
RUN mkdir -p /app/data /app/uploads

# Run migrations and seed
RUN bun run migrate.ts && bun run seed.ts

EXPOSE 3001

CMD ["bun", "run", "src/index.ts"]
