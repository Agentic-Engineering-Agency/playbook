# Agentic Engineering Playbook

Public, bilingual documentation for the open methods, kits, and verified proof paths published by Agentic Engineering.

Production: <https://labs.agenticengineering.agency>

## Product boundary

The Playbook is a public documentation and proof-distribution surface.

It includes:

- reviewed English and Spanish guides for public methods and kits;
- a source-verified catalog of suitable public Agentic Engineering projects;
- install paths verified against a source repository or package registry;
- machine-readable documentation at `/llms.txt` and `/llms-full.txt`;
- public proof paths only after their sources and claims have been reviewed.

It does not include:

- internal operating dashboards or live project status;
- customer workspaces, private data, credentials, or internal runbooks;
- unverified portfolio, ownership, performance, or production claims.

The linked product repositories remain the source for releases and implementation details. The [Agentic Engineering website](https://agenticengineering.agency) owns the public services and contact journey.

## Information architecture

- **Methods** — reusable planning, specification, execution, verification, and review loops.
- **Kits** — verified distribution paths for packaged public workflows.
- **Proof** — the ownership, license, availability, and evidence rules behind public claims.
- **Public projects** — organization-owned, non-archived repositories with a sufficiently clear public release or documentation boundary.

The catalog distinguishes a repository license from license metadata attached only to a distributed package. Public visibility by itself is not treated as an open-source grant or as evidence that a project is ready to promote.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Verification

Run the complete local release gate:

```bash
npm run verify
```

That command verifies the public-content boundary and bilingual page pairs, runs TypeScript and ESLint, builds the static export, and checks representative generated routes and machine-readable documentation.

Individual checks:

```bash
npm run verify:content
npm run types:check
npm run lint
npm run build
npm run verify:routes
```

## Content rules

1. Add or change public MDX pages in English and Spanish together.
2. Link product claims and install paths to their canonical public source.
3. Omit commands that cannot be verified.
4. Keep customer, company-operating, and internal project data out of this repository.
5. Preserve `/llms.txt`, `/llms-full.txt`, and per-page Markdown routes for machine readers.

## AI and search

The site provides local documentation search. It intentionally does not expose a secret-backed generative chat endpoint. Any future AI assistant requires a separate, reviewed design with bounded inputs, abuse controls, deterministic model policy, cost limits, and safe observability before it can be enabled.

## Deployment

Cloudflare Pages deployment is automated from `main` by the repository workflow after verification succeeds. Do not manually deploy from a development branch.

The repository does not currently declare a repository-wide license. Each linked product repository documents its own license.
