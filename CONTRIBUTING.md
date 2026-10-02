# Contributing to the Agentic Engineering Playbook

The Playbook accepts changes that improve its public methods, kits, proof rules, source-verified project catalog, or the static publishing surface around them.

## Before opening a change

Use a [GitHub issue](https://github.com/Agentic-Engineering-Agency/playbook/issues) when a change needs discussion, introduces a public claim, or changes an installation or availability statement. Small corrections can go directly to a pull request when their source is clear.

Keep internal project status, customer information, credentials, private runbooks, founder data, and unverified performance or portfolio claims out of this repository.

## Source-of-truth rules

- Public documentation lives in [`content/docs/`](content/docs/). Add or update the English and Spanish page together.
- Catalog facts and localized catalog copy live in [`lib/public-projects.ts`](lib/public-projects.ts). Link ownership, license, package, documentation, and status claims to their canonical public evidence.
- Installation commands must resolve through the named public package, repository manifest, or official tool documentation. Omit a command when it cannot be verified.
- The machine-readable routes and static export derive from the same content. Do not edit generated files in `out/`.
- Repository policy belongs in the root governance file that owns it; link to that file instead of copying the policy into multiple pages.

## Local workflow

Use Node.js 22 and npm:

```bash
npm ci
npm run dev
```

Before opening a pull request, run:

```bash
npm run verify
npm audit --audit-level=low
git diff --check
```

## Pull request expectations

A pull request should explain:

- what public reader or maintainer problem it solves;
- which canonical sources support any changed claim;
- how English and Spanish remain aligned;
- which checks were run;
- any limitation or follow-up decision that remains.

Use the repository pull request template as the final checklist. Never include secrets, private identifiers, customer data, or internal-only links in a branch, issue, test fixture, screenshot, or build artifact.

## Rights and licensing

Only contribute material that you have the right to submit. Identify third-party material and its terms in the pull request.

The repository-wide licensing model is pending in [issue #5](https://github.com/Agentic-Engineering-Agency/playbook/issues/5). Do not add or change license texts, copyright notices, or attribution requirements without resolving that decision and confirming the organization controls the affected rights.
