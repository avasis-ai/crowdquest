#!/bin/sh
set -eu

fail() {
  printf '%s\n' "crowdquest-entrypoint: $*" >&2
  exit 1
}

read_secret() {
  secret_file="$1"
  [ -n "$secret_file" ] || fail "a required secret file was not configured"
  [ -r "$secret_file" ] || fail "a required secret file is not readable"
  secret_value=$(tr -d '\r\n' < "$secret_file")
  [ -n "$secret_value" ] || fail "a required secret file is empty"
  printf '%s' "$secret_value"
}

read_optional_secret() {
  secret_file="$1"
  [ -n "$secret_file" ] || return 0
  [ -r "$secret_file" ] || fail "an optional secret file was configured but is not readable"
  tr -d '\r\n' < "$secret_file"
}

case "${POSTGRES_USER:-}" in
  ""|*[!A-Za-z0-9_]*) fail "POSTGRES_USER must contain only letters, numbers, and underscores" ;;
esac
case "${POSTGRES_DB:-}" in
  ""|*[!A-Za-z0-9_]*) fail "POSTGRES_DB must contain only letters, numbers, and underscores" ;;
esac

postgres_password_encoded=$(
  node -e \
    'const fs=require("node:fs"); const value=fs.readFileSync(process.argv[1], "utf8").trim(); if(!value) process.exit(1); process.stdout.write(encodeURIComponent(value));' \
    "${POSTGRES_PASSWORD_FILE:-}"
) || fail "could not read the PostgreSQL password secret"

export DATABASE_URL="postgresql://${POSTGRES_USER}:${postgres_password_encoded}@${POSTGRES_HOST:-postgres}:${POSTGRES_PORT:-5432}/${POSTGRES_DB}"
export ADMIN_TOKEN="$(read_secret "${ADMIN_TOKEN_FILE:-}")"

txline_api_token=$(read_optional_secret "${TXLINE_API_TOKEN_FILE:-}")
if [ -n "$txline_api_token" ]; then
  export TXLINE_API_TOKEN="$txline_api_token"
else
  unset TXLINE_API_TOKEN
fi

coinbase_agent_token=$(read_optional_secret "${COINBASE_AGENT_TOKEN_FILE:-}")
if [ -n "$coinbase_agent_token" ] && [ -n "${COINBASE_AGENT_URL:-}" ]; then
  export COINBASE_AGENT_TOKEN="$coinbase_agent_token"
else
  unset COINBASE_AGENT_TOKEN COINBASE_AGENT_URL
fi

unset postgres_password_encoded secret_file secret_value txline_api_token coinbase_agent_token
exec "$@"
