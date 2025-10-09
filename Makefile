dev: ; cd infra/docker && docker compose up --build -d
down: ; cd infra/docker && docker compose down
ps: ; cd infra/docker && docker compose ps
logs-api: ; cd infra/docker && docker compose logs -f api
logs-web: ; cd infra/docker && docker compose logs -f web
