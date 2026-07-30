# Public project catalog audit

Date checked: 2026-07-29 (America/Mexico_City)

## Scope and method

This is a point-in-time audit of the 25 repositories returned by the GitHub API for the
[`Agentic-Engineering-Agency` organization](https://github.com/Agentic-Engineering-Agency).
It uses only first-party GitHub repository metadata and READMEs, canonical project
documentation, and public npm registry metadata. A public GitHub repository is not
automatically treated as an Agentic Engineering product: forks, archived experiments,
landing-page source, internal knowledge stores, and repositories without a usable public
artifact or sufficiently clear public documentation are separated below.

Recommended catalog language should distinguish:

- **Open source**: the repository or package declares a recognized license.
- **Public source**: the source is visible, but no repository license is declared.
- **Public package**: a package was independently found in the public npm registry.
- **Public demo/docs**: the first-party URL returned HTTP 200 when checked.

Repository ownership below means the repository is owned by
`Agentic-Engineering-Agency` and GitHub reports `fork: false`.

## Recommended catalog entries

### Ultimate Harness

- **Ownership/status:** organization-owned, public, not archived, not a fork.
- **License:** `MIT` is declared in
  [`package.json`](https://github.com/Agentic-Engineering-Agency/ultimate-harness/blob/main/package.json);
  GitHub does not currently detect a standalone repository license file.
- **Purpose:** a runtime-agnostic software-development harness that standardizes mission
  packets, runtime adapters, sandbox policy, verification, human review, and promotion
  around agentic engineering work.
- **Verified distribution:** public npm package
  [`@agenticengineeringagency/ultimate-harness`](https://registry.npmjs.org/@agenticengineeringagency%2Fultimate-harness/latest),
  version `0.9.0` when checked; its binary is `uh`.
- **Safe calls to action:**
  [project site](https://uh.agenticengineering.lat),
  [source](https://github.com/Agentic-Engineering-Agency/ultimate-harness),
  [quickstart](https://github.com/Agentic-Engineering-Agency/ultimate-harness/blob/main/docs/quickstart.md),
  and the repository-documented install command
  `bun add -g @agenticengineeringagency/ultimate-harness`.
- **Public status wording:** use the repository's own status vocabulary. The
  [README](https://github.com/Agentic-Engineering-Agency/ultimate-harness#current-status)
  says the end-to-end CLI is shipped, names six active runtime adapters, and labels the
  native Anthropic adapter experimental. Do not collapse all adapters into “stable.”

### Agentic PM Kit

- **Ownership/status:** organization-owned, public, not archived, not a fork.
- **License:** [MIT](https://github.com/Agentic-Engineering-Agency/agentic-pm-kit/blob/master/LICENSE).
- **Purpose:** installs project-management Agent Skills for producing PMBOK- and
  Scrum-shaped draft artifacts in Claude Code and Gemini CLI.
- **Verified distribution:** public npm package
  [`agentic-pm-kit`](https://registry.npmjs.org/agentic-pm-kit/latest), version `0.1.1`
  when checked.
- **Safe calls to action:**
  [documentation](https://labs.agenticengineering.agency/docs/pm-kit),
  [source](https://github.com/Agentic-Engineering-Agency/agentic-pm-kit), and
  `npx agentic-pm-kit install`, which matches both the public registry package and the
  [canonical README](https://github.com/Agentic-Engineering-Agency/agentic-pm-kit#install).

### Prototype Kit

- **Ownership/status:** organization-owned, public, not archived, not a fork.
- **License:** [MIT](https://github.com/Agentic-Engineering-Agency/prototype-kit/blob/main/LICENSE).
- **Purpose:** a source-distributed Claude Code plugin and Gemini CLI extension that
  installs a prototype-from-docs workflow and related frontend tooling.
- **Verified distribution boundary:** the repository contains both
  [`.claude-plugin`](https://github.com/Agentic-Engineering-Agency/prototype-kit/tree/main/.claude-plugin)
  and
  [`gemini-extension.json`](https://github.com/Agentic-Engineering-Agency/prototype-kit/blob/main/gemini-extension.json).
  The README's claimed npm package
  `@agentic-engineering/prototype-kit` returned npm `E404` when checked.
- **Safe calls to action:** [source](https://github.com/Agentic-Engineering-Agency/prototype-kit)
  plus the source-backed Claude/Gemini installation paths already documented in the
  repository. Do **not** restore the unverified `npx @agentic-engineering/prototype-kit
  init` command, and do not surface the README's “submission pending” Smithery command.

### SpecSafe

- **Ownership/status:** organization-owned, public, not archived, not a fork.
- **License:** [MIT](https://github.com/Agentic-Engineering-Agency/specsafe/blob/main/LICENSE).
- **Purpose:** a two-phase planning and test-driven development framework for
  AI-assisted development, with a documented spec-slice lifecycle.
- **Verified distribution:** public npm package
  [`@specsafe/cli`](https://registry.npmjs.org/@specsafe%2Fcli/latest), version `2.2.3`
  when checked.
- **Safe calls to action:**
  [source](https://github.com/Agentic-Engineering-Agency/specsafe),
  [canonical workflow](https://github.com/Agentic-Engineering-Agency/specsafe/blob/main/docs/SPECSAFE-CANONICAL-WORKFLOW.md),
  and the README-documented `npm install -g @specsafe/cli`.

### Triage

- **Ownership/status:** organization-owned, public, not archived, not a fork.
- **License:** [MIT](https://github.com/Agentic-Engineering-Agency/triage/blob/main/LICENSE).
- **Purpose:** an AI-assisted SRE incident-triage project for a public Solidus/Rails demo
  target, with source and standalone public documentation.
- **Safe calls to action:**
  [documentation](https://triage.agenticengineering.lat) and
  [source](https://github.com/Agentic-Engineering-Agency/triage).
- **Public status wording:** describe it as a public project/demo. Avoid copying numerical
  benchmark-like claims or integration state from the long README into a catalog card;
  those need separate evidence review.

### Paperclip adapter for OMP

- **Ownership/status:** organization-owned, public, not archived, not a fork.
- **License:** [MIT](https://github.com/Agentic-Engineering-Agency/paperclip-adapter-omp/blob/main/LICENSE).
- **Purpose:** lets Paperclip invoke Oh My Pi as a local agent runtime and translate OMP
  sessions, events, and usage metadata into Paperclip's adapter contract.
- **Verified distribution:** public npm package
  [`@agentic-engineering-agency/paperclip-adapter-omp`](https://registry.npmjs.org/@agentic-engineering-agency%2Fpaperclip-adapter-omp/latest),
  version `0.5.0` when checked.
- **Safe calls to action:**
  [source](https://github.com/Agentic-Engineering-Agency/paperclip-adapter-omp),
  [integration guide](https://github.com/Agentic-Engineering-Agency/paperclip-adapter-omp/blob/main/docs/integration.md),
  and `npm install @agentic-engineering-agency/paperclip-adapter-omp`.
- **Content caution:** do not copy the README's version-pinned external-adapter payload;
  it still names `0.1.2`, while the public package is now `0.5.0`.

### Paperclip Langfuse export plugin

- **Ownership/status:** organization-owned, public, not archived, not a fork.
- **License:** the public npm package declares `MIT`; GitHub does not detect a repository
  license and current source does not contain a standalone `LICENSE` file.
- **Purpose:** exports Paperclip trace-shaped events to Langfuse ingestion with bounded
  batching and non-fatal behavior when export is unavailable.
- **Verified distribution:** public npm package
  [`@agentic-engineering-agency/paperclip-plugin-langfuse-export`](https://registry.npmjs.org/@agentic-engineering-agency%2Fpaperclip-plugin-langfuse-export/latest),
  version `0.3.0` when checked.
- **Safe calls to action:**
  [source](https://github.com/Agentic-Engineering-Agency/paperclip-plugin-langfuse-export)
  and the public package page/registry metadata.
- **Content caution:** label the license as “MIT package metadata,” not “MIT repository,”
  until a license file is added to the source repository.

## Public repositories intentionally excluded from the catalog

| Repository | Reason for exclusion |
| --- | --- |
| [`agentforge`](https://github.com/Agentic-Engineering-Agency/agentforge) | Archived. |
| [`Agentic-Engineering-Plugins`](https://github.com/Agentic-Engineering-Agency/Agentic-Engineering-Plugins) | Public marketplace shell, but its canonical [marketplace manifest](https://github.com/Agentic-Engineering-Agency/Agentic-Engineering-Plugins/blob/main/.claude-plugin/marketplace.json) currently has an empty `plugins` array and the repository has no declared license. |
| [`agentic-engineering-wiki`](https://github.com/Agentic-Engineering-Agency/agentic-engineering-wiki) | Public knowledge workspace, not a distributable project; no root README or declared license. Its mixed research/log content also requires a separate public-content review before promotion. |
| [`awesome-openclaw-usecases`](https://github.com/Agentic-Engineering-Agency/awesome-openclaw-usecases) | Fork of `hesamsheikh/awesome-openclaw-usecases`; not owned project work. |
| [`capital-sentinel`](https://github.com/Agentic-Engineering-Agency/capital-sentinel) | Archived and no declared license. |
| [`code-colony`](https://github.com/Agentic-Engineering-Agency/code-colony) | Public source preview, but package is private, no license is declared, and the README explicitly describes a seeded local vertical slice with mocked/partial surfaces and internal sprint-ticket language. Reconsider after a public release boundary and license exist. |
| [`curia-landing`](https://github.com/Agentic-Engineering-Agency/curia-landing) | Product landing-page implementation, not an open-source public tool; no declared license. Excluded to preserve the instruction not to publish internal Curia data in Playbook. |
| [`freellmapi`](https://github.com/Agentic-Engineering-Agency/freellmapi) | Archived fork. |
| [`hermes-claude-auth`](https://github.com/Agentic-Engineering-Agency/hermes-claude-auth) | Archived fork. |
| [`memorybench-memswe`](https://github.com/Agentic-Engineering-Agency/memorybench-memswe) | Fork of `supermemoryai/memorybench`; its own README says it is reference material only and not the canonical MemSWE runtime/spec. |
| [`multica-testing`](https://github.com/Agentic-Engineering-Agency/multica-testing) | Archived fork. |
| [`omp-pantheon`](https://github.com/Agentic-Engineering-Agency/omp-pantheon) | Substantive public-source harness, but no license is declared and its canonical README's install section clones `Sebastiangmz/omp-pantheon`, not the organization repository. Reconsider after the ownership/install path and license are corrected. |
| [`paperclip-plugin-chat`](https://github.com/Agentic-Engineering-Agency/paperclip-plugin-chat) | Fork of `webprismdevin/paperclip-plugin-chat`; no declared license. |
| [`pi-memswe`](https://github.com/Agentic-Engineering-Agency/pi-memswe) | Fork of `earendil-works/pi`; benchmark harness fork rather than an independently owned public product. |
| [`pi-seshat`](https://github.com/Agentic-Engineering-Agency/pi-seshat) | Public source but no declared license; the README also includes internal project identity/configuration details that are outside the Playbook public boundary. |
| [`playbook`](https://github.com/Agentic-Engineering-Agency/playbook) | This documentation/distribution surface itself, not a catalog entry; no repository license is declared. |
| [`skills`](https://github.com/Agentic-Engineering-Agency/skills) | Fork of `mattpocock/skills`; not owned project work. |
| [`solidus`](https://github.com/Agentic-Engineering-Agency/solidus) | Archived upstream fork. |

## Catalog implementation guidance

1. Lead with Ultimate Harness, then group the remaining entries by use:
   **engineering workflow** (SpecSafe, Prototype Kit), **project work**
   (Agentic PM Kit), **runtime integrations** (Paperclip adapter and Langfuse
   exporter), and **public demo/reference implementation** (Triage).
2. Give every card an explicit status/availability label, ownership
   (`Agentic Engineering`), source link, license wording, and one primary CTA.
3. Keep detailed install commands only where a public package or source manifest was
   independently verified. A source link is safer than an install CTA when packaging is
   absent or stale.
4. Keep EN/ES descriptions semantically equivalent; do not translate package names,
   repository names, commands, status labels defined by a project, or URLs.
5. Treat this inventory as a dated evidence snapshot, not an automatically current
   portfolio tracker. Changes in public availability should be re-verified against the
   sources above before editing the catalog.
