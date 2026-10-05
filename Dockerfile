# Frontend Dockerfile
# O build roda na arquitetura da máquina que builda (o resultado é só HTML/JS/CSS);
# apenas a imagem final do nginx segue a plataforma alvo (linux/amd64 no servidor).
FROM --platform=$BUILDPLATFORM oven/bun:1 AS build
WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Copy source and build
COPY . .
RUN bun run build

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
