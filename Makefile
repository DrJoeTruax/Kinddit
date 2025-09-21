COMPOSE_FILE ?= infra/docker/compose.yml
COMPOSE_CMD ?= docker compose

.PHONY: dev down logs ps

dev:
	$(COMPOSE_CMD) -f $(COMPOSE_FILE) up --build -d

down:
	$(COMPOSE_CMD) -f $(COMPOSE_FILE) down

logs:
	$(COMPOSE_CMD) -f $(COMPOSE_FILE) logs -f

ps:
	$(COMPOSE_CMD) -f $(COMPOSE_FILE) ps
