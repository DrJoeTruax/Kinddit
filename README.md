# Kinddit

Kinddit is an open-core, AGPL-3.0 licensed social platform that proves safer-by-design community mechanics. The monorepo packages a FastAPI backend, a Next.js 14 front-end inspired by Reddit 2023, and infra scripts for shipping to Vercel + Supabase quickly.

## Core principles

- **No private channels** – Direct messages are removed entirely.
- **Everything logged** – Blocks, moderation tickets, and AutoModerator actions surface to public dashboards.
- **Open core + safety pack** – Advanced ML moderation ships separately via the proprietary [safety-pack](https://github.com/DrJoeTruax/safety-pack) while the foundation stays AGPL-3.0.

## Repository layout

```
apps/
  api/          # FastAPI service scaffold (Supabase-compatible models)
  frontend/     # Next.js 14 App Router experience (Tailwind + shadcn-inspired components)
packages/
  shared/       # Cross-service types and utilities
  sdk/          # Future client SDK surface
infra/
  docker/       # Local docker-compose and images
  terraform/    # Infrastructure as code stubs
tests/         # Integration + e2e harnesses (coming soon)
```

## Frontend (Next.js 14) quick start

The Kinddit web client lives in `apps/frontend` and is aligned with the Lean MVP brief (communities, posts, tickets, Block-Lock UI, transparency profile tabs, and AutoModerator previews).

```bash
cd apps/frontend
npm install
npm run dev
```

### Feature highlights

- **Communities** – `/c/[slug]` routes with banner, membership counts, tags, and filtered feeds.
- **Posts & comments** – Card + compact rendering, vote affordances, inline transparency ticket summaries, and Block-Lock badges that freeze abusive chains.
- **Tickets dashboard** – `/tickets` lists every moderation review with public status chips.
- **Profiles** – `/u/[username]` exposes tickets filed, received, blocks issued, and memberships.
- **AutoModerator visualizer** – See regex rules with animated previews before shipping.
- **Theme control** – Dark mode by default with a toggle (Inter + Manrope typography, teal accents).

### Configuration

Copy `.env.example` to `.env` and supply your Supabase project credentials:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The Next.js runtime reads `NEXT_PUBLIC_SUPABASE_*` in the browser; the service role key is reserved for server actions.

## Backend + Infra

The API scaffolding in `apps/api` contains FastAPI endpoints, Alembic migrations, and Docker Compose integration ready to wire into Supabase Postgres. Terraform and Docker assets under `infra/` continue to support local smoke tests and future cloud roll-outs.

## Community links

- [Contributing](CONTRIBUTING.md)
- [Governance](GOVERNANCE.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Feature Gates](FEATURE_GATES.md)

## License

AGPL-3.0 © [DrJoeTruax](https://github.com/DrJoeTruax)
