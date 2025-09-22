# Infrastructure

The `infra` directory contains infrastructure-as-code and environment provisioning assets for Kinddit.

* `docker/` — Local development environment powered by Docker Compose, including PostgreSQL, Redis, OpenSearch, MinIO, Mailhog, the API, and the web app.
* `terraform/` — Stubs and modules for provisioning cloud infrastructure. These will be expanded as deployment targets solidify.

Refer to component-specific documentation within each subdirectory for usage details as the stack is implemented.
