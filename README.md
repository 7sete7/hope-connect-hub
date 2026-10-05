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

## Deploy (produção — entreellasoficial.com.br)

O site roda no servidor `147.15.19.64` **em paralelo** ao sidekick: as portas 80/443 são do Caddy do sidekick, e o Entre Ellas só adiciona seus blocos ao Caddyfile dele.

```
Caddy do sidekick (80/443) ──► entreellas-web (nginx) ──► backend (Bun + SQLite)
        rede sidekick_default            rede entreellas_default
```

### Publicar / atualizar

Requer Docker local rodando e acesso SSH ao servidor (`DEPLOY_*` no `.env`).

```bash
./deploy.sh --start   # builda (linux/amd64), envia e sobe no servidor
```

Sem `--start`, só envia; depois rode no servidor `cd ~/entreellas && ./server-start.sh`.

O `server-start.sh`:
- carrega as imagens e sobe `frontend` + `backend` (projeto `entreellas`);
- insere/atualiza o bloco do domínio no `~/sidekick/Caddyfile` (entre os marcadores `# >>> entreellas` / `# <<< entreellas`), valida e faz `caddy reload` — sem reiniciar nada do sidekick. Se a validação falhar, restaura o arquivo anterior.

> O `deploy.sh` do sidekick sobrescreve o Caddyfile do servidor. O bloco do Entre Ellas também está no `Caddyfile` do repositório bob-assistant; se for removido de lá, rode `./server-start.sh` aqui de novo.

### Dados
- O `.env` do servidor (`~/entreellas/.env`) só é enviado no primeiro deploy e nunca é sobrescrito.
- Banco e uploads: volumes `entreellas_db-data` e `entreellas_uploads`. Faça backup deles.
- A cada start o backend aplica migrations pendentes e roda o seed **só se o banco estiver vazio**.

### Servidor dedicado (alternativa)
`docker compose up -d --build` usa o `docker-compose.yml`, com Caddy próprio nas portas 80/443.

## Makefile

| Comando | Descrição |
|---------|-----------|
| `make dev-backend` | Inicia backend com hot-reload |
| `make dev-frontend` | Inicia frontend com HMR |
| `make deploy` | Publica no servidor (`./deploy.sh --start`) |
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
| GET | `/api/events` | Listar eventos (sem login, apenas publicados) | Não |
| GET | `/api/events?status=published` | Listar publicados | Não |
| POST | `/api/events` | Criar evento | Sim |
| PUT | `/api/events/:id` | Atualizar evento | Sim |
| DELETE | `/api/events/:id` | Remover evento | Sim |
| GET | `/api/partners` | Listar parceiros (com `whatsapp`, `instagram` e `website` opcionais) | Não |
| POST | `/api/partners` | Criar parceiro | Sim |
| PUT | `/api/partners/:id` | Atualizar parceiro | Sim |
| DELETE | `/api/partners/:id` | Remover parceiro | Sim |
| GET | `/api/about` | Obter conteúdo "Sobre" | Não |
| PUT | `/api/about` | Atualizar "Sobre" | Sim |
| GET | `/api/contact` | Obter configurações de contato | Não |
| PUT | `/api/contact` | Atualizar contato | Sim |
| POST | `/api/contact/message` | Enviar mensagem de contato | Não |
| GET | `/api/contact/messages` | Listar mensagens recebidas | Sim |
| DELETE | `/api/contact/messages/:id` | Remover mensagem | Sim |
| GET | `/api/colors` | Obter cores do site | Não |
| PUT | `/api/colors` | Atualizar cores | Sim |
| POST | `/api/auth/login` | Login (retorna JWT) | Não |
| POST | `/api/upload` | Upload de imagem | Sim |
| GET | `/api/health` | Health check | Não |

## Credenciais

Definidas por `ADMIN_EMAIL` / `ADMIN_PASSWORD` no primeiro start. Em desenvolvimento, sem essas variáveis, o padrão é `admin@cooperativa.com` / `admin123`.

Para trocar a senha depois (o `.env` só vale no primeiro start):

```bash
ssh rocky@147.15.19.64
sudo docker exec entreellas-backend-1 bun run reset-password.ts admin@entreellasoficial.com.br 'NovaSenha'
```

## Variáveis de Ambiente

### Backend
| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3001` | Porta do servidor |
| `JWT_SECRET` | `cooperativa-secret-...` (só em dev) | Chave para assinar JWTs — obrigatória com `NODE_ENV=production` |
| `ADMIN_EMAIL` | `admin@cooperativa.com` | Email do admin criado pelo seed |
| `ADMIN_PASSWORD` | `admin123` | Senha do admin criado pelo seed |
| `DB_PATH` | `./data/cooperativa.sqlite` | Caminho do banco SQLite |
| `UPLOAD_DIR` | `./uploads` | Diretório para uploads |
| `CORS_ORIGINS` | `http://localhost:8080,...` | Origens permitidas (CORS) |

### Frontend
| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `VITE_API_URL` | `` (vazio) | URL base da API. Vazio = mesmo domínio (nginx/proxy do Vite) |
| `VITE_USE_LOCAL_STORAGE` | — | `true` para rodar sem backend, salvando no localStorage (preview do Lovable) |

## Tecnologias

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Bun, Bun.serve, bun:sqlite, jose (JWT)
- **Banco:** SQLite (WAL mode)
- **Deploy:** Docker, nginx
