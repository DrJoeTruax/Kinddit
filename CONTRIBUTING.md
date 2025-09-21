# Contributing to Kinddit

Thanks for your interest in building Kinddit. We aim to cultivate a respectful, transparent contributor experience. By participating you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Before you start

1. **Discuss significant work:** Open an issue to align on scope for new features or major refactors.
2. **Sign the CLA:** We require an executed [Contributor License Agreement](CLA.md) for all pull requests. The CLA bot will walk you through the signature when you open your first PR.
3. **Understand the roadmap:** Review [GOVERNANCE.md](GOVERNANCE.md) and [FEATURE_GATES.md](FEATURE_GATES.md) so your proposal fits the open-core plan.

## Development workflow

1. Fork the repository and create a feature branch.
2. Follow repository conventions for commit messages (`type(scope): summary`).
3. Keep changes small and focused; include documentation updates when behavior changes.
4. Ensure your branch is rebased on the latest `main` before opening a pull request.

## Testing requirements

* **API (FastAPI):**
  * Install dependencies via Poetry (preferred) or pip.
  * Run `pytest` and ensure it passes locally.
* **Frontend (Next.js):**
  * Install dependencies with `npm ci`.
  * Run `npm run lint` and `npm run test` if applicable, plus `npm run build`.
* **Infrastructure and tooling:**
  * Update configuration and docs when adding environment variables or Docker services.
  * Provide integration tests under `/tests` when possible.

Pull requests must include evidence of successful test runs in the description. CI must pass before review.

## Code review expectations

* Two approvals are required for non-trivial changes.
* Respond to feedback promptly; if you disagree, explain your rationale and seek consensus.
* Avoid force-pushing after reviews unless you coordinate with reviewers.

## Security and responsible disclosure

If you discover a vulnerability, do not open a public issue. Instead, follow the process in [SECURITY.md](SECURITY.md).

## Community standards

By contributing you affirm that your work complies with our policies on safety, privacy, and respectful communication. Moderators may take action against violations in alignment with the Code of Conduct.
