# Kinddit

Kinddit is a safe-by-design, open-core social platform focused on public community interactions. All conversations happen in the open or through moderated ticket workflows—there are no direct messages. The public Kinddit repository contains the open features licensed under the AGPL-3.0, while the commercial safety-pack repository delivers proprietary safety augmentations.

## Project vision

* **Safety first:** Block-Lock, subtree interaction bans, public moderation tickets, and consent relay tools create transparent guardrails against abuse.
* **Open collaboration:** Core functionality is open so communities can audit and extend the platform.
* **Commercial extensions:** Advanced ML heuristics, staff dashboards, and other closed features ship via [safety-pack](https://github.com/DrJoeTruax/safety-pack).

## Monorepo layout

```
/apps
  /frontend    # Next.js + TypeScript web app
  /api         # FastAPI backend
/packages
  /shared      # Shared TypeScript/JavaScript utilities
  /sdk         # Client SDK (Apache-2.0)
/infra
  /docker      # Local Docker Compose stack
  /terraform   # Cloud infrastructure stubs
/tests         # Cross-cutting integration tests
```

## Getting started

This repository currently contains documentation, governance, and scaffolding for future development. See the roadmap in [GOVERNANCE.md](GOVERNANCE.md) and the contribution process in [CONTRIBUTING.md](CONTRIBUTING.md).

### safety-pack

The closed-source safety-pack repository contains:

* Advanced moderation heuristics and ML models
* Staff dashboards for escalations
* Reputation, brigading, and domain analysis tooling

To learn more, review the public README in that repository and contact the maintainers for commercial access.

## License

The Kinddit codebase is licensed under the [GNU Affero General Public License v3.0](LICENSE). The `packages/sdk` directory is dual-licensed under [Apache-2.0](packages/sdk/LICENSE) to enable broader integration scenarios.
