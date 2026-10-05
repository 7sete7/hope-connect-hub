#!/usr/bin/env bash
set -euo pipefail

# ---------------------------------------------------------------------------
# server-start.sh — lado do servidor.
#
# Rode depois que o deploy.sh enviou os arquivos:
#
#   cd ~/entreellas && ./server-start.sh
#
# Espera no mesmo diretório:
#   images.tar.gz      — buildado e enviado pelo deploy.sh
#   docker-compose.yml — cópia do docker-compose.prod.yml
#   Caddyfile          — blocos do domínio, inseridos no Caddy compartilhado
#   .env               — segredos; nunca sobrescrito pelo deploy
#
# As portas 80/443 pertencem ao Caddy de outro projeto (sidekick). Este script
# só sobe os containers do Entre Ellas e insere/atualiza nossos blocos no
# Caddyfile dele (entre marcadores), validando antes de recarregar — sem
# reiniciar nenhum container de lá.
# ---------------------------------------------------------------------------

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

COMPOSE_PROJECT="entreellas"
SHARED_CADDYFILE="${SHARED_CADDYFILE:-$HOME/sidekick/Caddyfile}"
SHARED_CADDY_CONTAINER="${SHARED_CADDY_CONTAINER:-sidekick-caddy-1}"
MARK_BEGIN="# >>> entreellas (gerenciado por ~/entreellas/server-start.sh)"
MARK_END="# <<< entreellas"

compose() { sudo docker compose --project-name "$COMPOSE_PROJECT" "$@"; }

if [[ ! -f .env ]]; then
  echo "error: .env não encontrado — crie a partir do .env.example" >&2
  exit 1
fi

# --- 1. Load images ---------------------------------------------------------
if [[ -f images.tar.gz ]]; then
  echo "▶  Carregando imagens Docker..."
  sudo docker load < images.tar.gz
  rm images.tar.gz
else
  echo "▶  images.tar.gz ausente — usando as imagens já carregadas."
fi

# --- 2. Start services ------------------------------------------------------
echo "▶  Subindo serviços..."
compose up -d --remove-orphans --wait

# --- 3. Shared Caddy: insere/atualiza nossos blocos e recarrega -------------
echo "▶  Atualizando Caddy compartilhado (${SHARED_CADDYFILE})..."
BACKUP="${SHARED_CADDYFILE}.bak-entreellas"
cp "$SHARED_CADDYFILE" "$BACKUP"

# Conteúdo atual sem o nosso bloco ($(...) já remove as linhas em branco do final)
OTHERS="$(awk -v b="$MARK_BEGIN" -v e="$MARK_END" '
  $0 == b { skip = 1; next }
  $0 == e { skip = 0; next }
  !skip
' "$BACKUP")"
NEW_CONTENT="$(printf '%s\n\n%s\n%s\n%s' "$OTHERS" "$MARK_BEGIN" "$(cat Caddyfile)" "$MARK_END")"

if [[ "$NEW_CONTENT" == "$(cat "$BACKUP")" ]]; then
  echo "   Caddyfile já atualizado."
else
  # Escreve no mesmo arquivo (mesmo inode), pois ele é bind-mount no container
  printf '%s\n' "$NEW_CONTENT" > "$SHARED_CADDYFILE"
  if ! sudo docker exec "$SHARED_CADDY_CONTAINER" caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile > /dev/null 2>&1; then
    echo "error: Caddyfile inválido — restaurando o anterior" >&2
    cat "$BACKUP" > "$SHARED_CADDYFILE"
    sudo docker exec "$SHARED_CADDY_CONTAINER" caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >&2 || true
    exit 1
  fi
fi
sudo docker exec "$SHARED_CADDY_CONTAINER" caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
echo "   Caddy recarregado (backup em ${BACKUP})."

# --- 4. Prune stale images --------------------------------------------------
echo "▶  Removendo imagens antigas..."
sudo docker image prune -f --filter "until=24h" > /dev/null

# --- 5. Status --------------------------------------------------------------
echo ""
compose ps --format "table {{.Service}}\t{{.Status}}"
echo ""
if sudo docker exec "$SHARED_CADDY_CONTAINER" wget -qO- http://entreellas-web/api/health > /dev/null 2>&1; then
  echo "✅  Caddy → frontend → backend OK."
else
  echo "⚠️  O Caddy não alcançou http://entreellas-web/api/health — verifique: sudo docker compose -p ${COMPOSE_PROJECT} logs" >&2
fi
echo "   Site: https://entreellasoficial.com.br (requer DNS apontando para este servidor)"
