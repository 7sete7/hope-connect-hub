.PHONY: dev dev-backend dev-frontend deploy build up down migrate seed logs clean

# Development - run backend and frontend in parallel
dev: dev-backend dev-frontend

dev-backend:
	cd backend && bun run dev

dev-frontend:
	bun run dev

# Produção: builda, envia e sobe no servidor compartilhado (ver deploy.sh)
deploy:
	./deploy.sh --start

# Docker commands
build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

# Database commands
migrate:
	cd backend && bun run migrate.ts

seed:
	cd backend && bun run seed.ts

# Cleanup (APAGA banco, uploads e certificados)
clean:
	docker compose down -v
	rm -rf backend/data backend/uploads
