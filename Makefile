.PHONY: dev dev-backend dev-frontend build up down migrate seed logs clean

# Development - run backend and frontend in parallel
dev: dev-backend dev-frontend

dev-backend:
	cd backend && bun run dev

dev-frontend:
	bun run dev

# Docker commands
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

# Database commands
migrate:
	cd backend && bun run migrate.ts

seed:
	cd backend && bun run seed.ts

# Cleanup
clean:
	docker-compose down -v
	rm -rf backend/data backend/uploads
