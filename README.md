# Agentic Engineering Playbook

[![Deploy to Cloudflare Pages](https://github.com/Agentic-Engineering-Agency/playbook/actions/workflows/deploy-cloudflare-pages.yml/badge.svg)](https://github.com/Agentic-Engineering-Agency/playbook/actions/workflows/deploy-cloudflare-pages.yml)
[![License decision pending](https://img.shields.io/badge/license-decision%20pending-yellow)](https://github.com/Agentic-Engineering-Agency/playbook/issues/5)

The Playbook is Agentic Engineering’s public, bilingual documentation and proof-distribution surface for open methods, reusable kits, and source-verified public projects.

- Production: <https://labs.agenticengineering.agency>
- Spanish: <https://labs.agenticengineering.agency/es>
- Machine-readable corpus: <https://labs.agenticengineering.agency/llms-full.txt>

## Product boundary

This repository contains reviewed public documentation, the static site that publishes it, and the checks that keep its claims, locale pairs, metadata, and routes aligned.

It does not contain internal operating status, customer workspaces, credentials, private runbooks, founder data, or unverified portfolio and performance claims. Product repositories remain the source of truth for their releases and implementation details; the [Agentic Engineering website](https://agenticengineering.agency) owns the public services and contact journey.

Read the complete publication boundary in [About this Playbook](https://labs.agenticengineering.agency/docs/about) or [Acerca de este Playbook](https://labs.agenticengineering.agency/es/docs/about).

## Documentation map

- [Methods](https://labs.agenticengineering.agency/docs/methods) explains the shared planning, delivery, verification, and review loop.
- [Kits](https://labs.agenticengineering.agency/docs/kits) publishes installation paths only when they agree with a canonical source.
- [Proof](https://labs.agenticengineering.agency/docs/proof) defines the evidence and labeling rules behind public claims.
- [Public projects](https://labs.agenticengineering.agency/docs/projects) is generated from the reviewed catalog in [`lib/public-projects.ts`](lib/public-projects.ts).
- [`/llms.txt`](https://labs.agenticengineering.agency/llms.txt), [`/llms-full.txt`](https://labs.agenticengineering.agency/llms-full.txt), and per-page Markdown routes expose the same reviewed material to machine readers.

## Repository map

- [`content/docs/`](content/docs/) is the canonical English and Spanish documentation corpus.
- [`lib/public-projects.ts`](lib/public-projects.ts) owns catalog facts, evidence links, localized summaries, and license wording.
- [`scripts/`](scripts/) contains the publication-boundary and static-export release checks.
- [`.github/workflows/deploy-cloudflare-pages.yml`](.github/workflows/deploy-cloudflare-pages.yml) is the production deployment contract.

The generated export in `out/` is a build artifact, not a documentation source.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Verification

Run the same release gate used before production deployment:

```bash
npm run verify
npm audit --audit-level=low
```

`npm run verify` checks the public-content boundary and bilingual pairs, generates route types, runs TypeScript and ESLint, builds the static export, tests locale and metadata behavior, and verifies representative routes and machine-readable outputs.

## Contributing, support, and security

- Read [CONTRIBUTING.md](CONTRIBUTING.md) before changing content, catalog facts, or site behavior.
- Use [GitHub issues](https://github.com/Agentic-Engineering-Agency/playbook/issues) for public documentation and site problems after checking [SUPPORT.md](SUPPORT.md).
- Follow [SECURITY.md](SECURITY.md) for private vulnerability reports. Do not place secrets, private customer information, or exploitable details in a public issue.

## Deployment

Merges to `main` run the full verification gate and deploy the static `out/` directory to the existing Cloudflare Pages production project. Development branches must use local or preview validation; they must not be manually promoted to the production project.

## Licensing status

This repository does not yet grant a repository-wide open-source or open-content license. Default copyright therefore applies beyond the rights GitHub grants for viewing and forking public repositories.

[Issue #5](https://github.com/Agentic-Engineering-Agency/playbook/issues/5) records the recommended split—CC BY 4.0 for original documentation and MIT for site code/tooling—and the rights review required before applying it. Linked product repositories retain their own license terms.
