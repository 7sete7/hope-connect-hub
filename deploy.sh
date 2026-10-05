#!/usr/bin/env bash
set -euo pipefail

# ---------------------------------------------------------------------------
# deploy.sh — lado local.
#
# Builda as imagens (linux/amd64), exporta e envia tudo para o servidor.
# Depois, no servidor:
#
#   cd <DEPLOY_PATH> && ./server-start.sh
#
# Ou rode `./deploy.sh --start` para já executar o server-start.sh via SSH.
#
# Requer no .env:
#   DEPLOY_HOST   IP ou hostname do servidor
#   DEPLOY_USER   usuário SSH (padrão: root)
#   DEPLOY_PATH   diretório remoto (padrão: ~/entreellas)
#
# O .env só é enviado se ainda não existir no servidor — lá ele nunca é sobrescrito.
# ---------------------------------------------------------------------------

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

START_AFTER=false
[[ "${1:-}" == "--start" ]] && START_AFTER=true

# --- Load .env (only the deploy vars) --------------------------------------
if [[ ! -f .env ]]; then
  echo "error: .env não encontrado — copie o .env.example e preencha" >&2
  exit 1
fi

get_env() {
  grep -E "^${1}=" .env | cut -d= -f2- | tr -d '"' | tr -d "'" || true
}

DEPLOY_HOST="${DEPLOY_HOST:-$(get_env DEPLOY_HOST)}"
DEPLOY_USER="${DEPLOY_USER:-$(get_env DEPLOY_USER)}"
DEPLOY_PATH="${DEPLOY_PATH:-$(get_env DEPLOY_PATH)}"

DEPLOY_USER="${DEPLOY_USER:-root}"
DEPLOY_PATH="${DEPLOY_PATH:-~/entreellas}"

if [[ -z "$DEPLOY_HOST" ]]; then
  echo "error: DEPLOY_HOST não definido no .env" >&2
  exit 1
fi

REMOTE="${DEPLOY_USER}@${DEPLOY_HOST}"
COMPOSE_PROJECT="entreellas"
IMAGES="entreellas-frontend:latest entreellas-backend:latest"

echo ""
echo "🚀  Deploy para ${REMOTE}:${DEPLOY_PATH}"
echo ""

# --- 1. Build images -------------------------------------------------------
echo "▶  Buildando imagens Docker (linux/amd64)..."
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker compose --project-name "$COMPOSE_PROJECT" build frontend backend

# --- 2. Export images -------------------------------------------------------
TARBALL=$(mktemp /tmp/entreellas-images.XXXXXX)
trap 'rm -f "$TARBALL"' EXIT

echo "▶  Exportando imagens..."
# shellcheck disable=SC2086
docker save $IMAGES | gzip > "$TARBALL"
echo "   Tamanho: $(du -sh "$TARBALL" | cut -f1)"

# --- 3. Transfer files ------------------------------------------------------
echo "▶  Enviando arquivos para ${REMOTE}:${DEPLOY_PATH}..."
ssh "$REMOTE" "mkdir -p ${DEPLOY_PATH}"
scp -q Caddyfile server-start.sh .env.example "${REMOTE}:${DEPLOY_PATH}/"
scp -q docker-compose.prod.yml "${REMOTE}:${DEPLOY_PATH}/docker-compose.yml"
scp -q "$TARBALL" "${REMOTE}:${DEPLOY_PATH}/images.tar.gz"
ssh "$REMOTE" "chmod +x ${DEPLOY_PATH}/server-start.sh"

if ssh "$REMOTE" "test -f ${DEPLOY_PATH}/.env"; then
  echo "   .env já existe no servidor — mantido."
else
  echo "   .env ausente no servidor — enviando o local."
  scp -q .env "${REMOTE}:${DEPLOY_PATH}/.env"
  ssh "$REMOTE" "chmod 600 ${DEPLOY_PATH}/.env"
fi

if $START_AFTER; then
  echo ""
  echo "▶  Executando server-start.sh no servidor..."
  ssh "$REMOTE" "cd ${DEPLOY_PATH} && ./server-start.sh"
  exit 0
fi

echo ""
echo "✅  Arquivos enviados. Agora, no servidor:"
echo ""
echo "   ssh ${REMOTE}"
echo "   cd ${DEPLOY_PATH} && ./server-start.sh"
echo ""
