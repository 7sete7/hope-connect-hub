

## Plan: Backend com Bun Server + bun:sqlite

### Constraint
Lovable executa apenas frontend. Todos os arquivos do backend serao criados como arquivos estaticos no projeto. O frontend continuara funcionando com localStorage no preview do Lovable, mas ao clonar e rodar `docker-compose up`, tudo funciona junto.

### Estrutura Final

```text
/
├── frontend/              (codigo atual movido aqui)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   └── ...
├── backend/
│   ├── src/
│   │   ├── index.ts       (Bun.serve com routes)
│   │   ├── db.ts           (Database from bun:sqlite)
│   │   ├── routes/
│   │   │   ├── slides.ts
│   │   │   ├── events.ts
│   │   │   ├── partners.ts
│   │   │   ├── associates.ts
│   │   │   ├── about.ts
│   │   │   ├── contact.ts
│   │   │   ├── colors.ts
│   │   │   ├── auth.ts
│   │   │   └── upload.ts
│   │   └── middleware/
│   │       └── auth.ts     (JWT verify)
│   ├── migrations/
│   │   └── 001_init.sql
│   ├── seed.ts
│   ├── migrate.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── docker-compose.yml
├── Makefile
└── README.md
```

### Backend: Bun.serve com Routes API

O servidor usa a routes API nativa do Bun (v1.2.3+):

```typescript
import { Database } from "bun:sqlite";

const db = new Database("./data/cooperativa.sqlite", { create: true, strict: true });
db.exec("PRAGMA journal_mode = WAL;");

Bun.serve({
  port: 3001,
  routes: {
    "/api/slides": {
      GET: () => Response.json(db.query("SELECT * FROM slides ORDER BY `order`").all()),
      POST: async (req) => { /* auth + insert */ },
    },
    "/api/slides/:id": {
      PUT: async (req) => { /* auth + update */ },
      DELETE: async (req) => { /* auth + delete */ },
    },
    // ... same pattern for events, partners, associates, about, contact, colors, auth, upload
  },
  fetch(req) {
    // CORS headers + 404 fallback
  },
});
```

### Database Schema (migrations/001_init.sql)

Derivado diretamente dos tipos TypeScript existentes:

- **slides**: id TEXT PK, image TEXT, title TEXT, subtitle TEXT, "order" INTEGER
- **events**: id TEXT PK, title TEXT, content TEXT, image TEXT, date TEXT, status TEXT
- **partners**: id TEXT PK, name TEXT, logo TEXT, whatsapp TEXT, website TEXT
- **associates**: id TEXT PK, name TEXT, logo TEXT, whatsapp TEXT, website TEXT
- **about**: id INTEGER PK (singleton), intro, intro_image, mission, mission_image, vision, vision_image, values, values_image
- **contact_settings**: id INTEGER PK (singleton), whatsapp_number, email, phone, address
- **site_colors**: id INTEGER PK (singleton), primary, secondary, accent
- **users**: id TEXT PK, email TEXT UNIQUE, password_hash TEXT
- **contact_messages**: id TEXT PK, name, email, phone, subject, message, created_at

### Auth

- Login: `Bun.password.verify()` para bcrypt (built-in no Bun)
- JWT via jose ou implementacao manual com `Bun.CryptoHasher`
- Middleware extrai token do header `Authorization: Bearer <token>`

### migrate.ts & seed.ts

- `migrate.ts`: le arquivos `.sql` da pasta `migrations/` e executa via `db.run()`
- `seed.ts`: insere dados default (mesmos do `mockData.ts`) usando prepared statements

### Frontend Changes

- `src/services/api.ts`: detecta `VITE_API_URL` env var. Se definida, usa `fetch()` para API real. Senao, mantem localStorage (fallback para Lovable preview).
- `vite.config.ts`: adiciona proxy `/api` -> `http://localhost:3001` para dev local.

### Docker

- **frontend/Dockerfile**: multi-stage (bun install + vite build -> nginx)
- **backend/Dockerfile**: `FROM oven/bun:1` -> copia src, roda migrate+seed, `bun run src/index.ts`
- **docker-compose.yml**: frontend (:80), backend (:3001), volume compartilhado para `./data` (SQLite) e `./uploads`

### Makefile

```makefile
dev:         # roda backend + frontend em paralelo
build:       # docker-compose build
up:          # docker-compose up -d
down:        # docker-compose down
migrate:     # cd backend && bun run migrate.ts
seed:        # cd backend && bun run seed.ts
```

### Implementation Steps

1. Create all `backend/` files (server, routes, db, migrations, seed, package.json, tsconfig, Dockerfile)
2. Create `frontend/Dockerfile` and update `vite.config.ts` with API proxy
3. Create root `docker-compose.yml` and `Makefile`
4. Update `src/services/api.ts` to support real HTTP calls with localStorage fallback
5. Update root `README.md` with setup instructions

