# Security Policy

Kinddit is built for safety-critical communities. We take security vulnerabilities seriously and request that all reports follow the private disclosure process below.

## Reporting a vulnerability

* Email **security@kinddit.org** with a detailed description of the vulnerability, reproduction steps, and any proof-of-concept code or logs.
* Encrypt sensitive reports with our PGP key (fingerprint available on request) when possible.
* We will acknowledge receipt within **3 business days**.

## Disclosure timeline

* We strive to provide an initial assessment within **7 business days**.
* We aim to provide a remediation plan or fix within **30 days**.
* We adhere to a **90-day embargo** policy for public disclosure. We may extend this window for complex issues in coordination with the reporter.

## Scope

* Production Kinddit infrastructure and the reference Docker Compose environment.
* Official SDKs and packages maintained in this repository.
* Integrations that rely on safety-pack should coordinate with that team separately.

Out-of-scope submissions include phishing, social engineering, and issues that require physical access to infrastructure.

## Coordinated disclosure

We will credit reporters in release notes unless they request anonymity. Please do not share details publicly until we mutually agree that the issue has been resolved and the embargo period has ended.
