# Cooperativa Vida - Full Stack

Aplicação web completa para a Cooperativa Vida, com frontend React e backend Bun.

## Estrutura

```
/
├── src/                   # Frontend React (Vite + TypeScript + Tailwind)
├── backend/               # Backend Bun (Bun.serve + bun:sqlite)
│   ├── src/               # Código do servidor
│   │   ├── index.ts       # Entry point (Bun.serve)
│   │   ├── db.ts          # Conexão SQLite
│   │   ├── routes/        # Rotas da API
│   │   └── middleware/     # Auth middleware (JWT)
│   ├── migrations/        # Scripts SQL de migração
│   ├── migrate.ts         # Runner de migrations
│   ├── seed.ts            # Dados iniciais
│   └── Dockerfile
├── docker-compose.yml
├── Dockerfile             # Frontend (Vite build + nginx)
├── nginx.conf             # Configuração nginx para SPA + proxy
└── Makefile
```

## Requisitos

- [Bun](https://bun.sh) v1.2.3+
- Docker & Docker Compose (para deploy)

## Desenvolvimento Local

### 1. Backend
```bash
cd backend
bun install
bun run migrate.ts
bun run seed.ts
bun run dev
```
O backend roda em `http://localhost:3001`.

### 2. Frontend
```bash
bun install
bun run dev
```
O frontend roda em `http://localhost:8080` com proxy automático para o backend.

## Docker

```bash
# Build e iniciar tudo
docker-compose up -d

# Ou usando Make
make build
make up
```

Acesse `http://localhost` (porta 80).

## Makefile

| Comando | Descrição |
|---------|-----------|
| `make dev-backend` | Inicia backend com hot-reload |
| `make dev-frontend` | Inicia frontend com HMR |
| `make build` | Build dos containers Docker |
| `make up` | Inicia containers em background |
| `make down` | Para containers |
| `make logs` | Visualiza logs dos containers |
| `make migrate` | Executa migrations do banco |
| `make seed` | Insere dados iniciais |
| `make clean` | Remove containers e dados |

## API Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/api/slides` | Listar slides | Não |
| POST | `/api/slides` | Criar slide | Sim |
| PUT | `/api/slides/:id` | Atualizar slide | Sim |
| DELETE | `/api/slides/:id` | Remover slide | Sim |
| GET | `/api/events` | Listar eventos | Não |
| GET | `/api/events?status=published` | Listar publicados | Não |
| POST | `/api/events` | Criar evento | Sim |
| PUT | `/api/events/:id` | Atualizar evento | Sim |
| DELETE | `/api/events/:id` | Remover evento | Sim |
| GET | `/api/partners` | Listar parceiros | Não |
| POST | `/api/partners` | Criar parceiro | Sim |
| PUT | `/api/partners/:id` | Atualizar parceiro | Sim |
| DELETE | `/api/partners/:id` | Remover parceiro | Sim |
| GET | `/api/associates` | Listar associados | Não |
| POST | `/api/associates` | Criar associado | Sim |
| PUT | `/api/associates/:id` | Atualizar associado | Sim |
| DELETE | `/api/associates/:id` | Remover associado | Sim |
| GET | `/api/about` | Obter conteúdo "Sobre" | Não |
| PUT | `/api/about` | Atualizar "Sobre" | Sim |
| GET | `/api/contact` | Obter configurações de contato | Não |
| PUT | `/api/contact` | Atualizar contato | Sim |
| POST | `/api/contact/message` | Enviar mensagem de contato | Não |
| GET | `/api/colors` | Obter cores do site | Não |
| PUT | `/api/colors` | Atualizar cores | Sim |
| POST | `/api/auth/login` | Login (retorna JWT) | Não |
| POST | `/api/upload` | Upload de imagem | Sim |
| GET | `/api/health` | Health check | Não |

## Credenciais Padrão

- **Email:** admin@cooperativa.com
- **Senha:** admin123

## Variáveis de Ambiente

### Backend
| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3001` | Porta do servidor |
| `JWT_SECRET` | `cooperativa-secret-...` | Chave para assinar JWTs |
| `DB_PATH` | `./data/cooperativa.sqlite` | Caminho do banco SQLite |
| `UPLOAD_DIR` | `./uploads` | Diretório para uploads |
| `CORS_ORIGINS` | `http://localhost:8080,...` | Origens permitidas (CORS) |

### Frontend
| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `VITE_API_URL` | `` (vazio) | URL base da API. Se vazio, usa localStorage |

## Tecnologias

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Bun, Bun.serve, bun:sqlite, jose (JWT)
- **Banco:** SQLite (WAL mode)
- **Deploy:** Docker, nginx
