# hookops-shared

Versioned runtime contracts and pure cross-service helpers for HookOps.

## Ownership

This repository owns schemas, inferred TypeScript types, compatibility checks,
error codes, and pure observability helpers shared by HookOps services. It does
not own service behavior, persistence models, Prisma entities, orchestration, or
deployment configuration.

Consumers install an exact published version of
`@fredieposh/hookops-shared` from GitHub Packages. Contract changes must remain
compatible with the versioning rules and be validated against consumers before
publication.

## Repository layout

HookOps repositories are expected to be cloned as sibling directories:

```text
hookops/
├── hookops-shared/
├── hookops-api/
├── hookops-worker/
└── hookops-infra/
```

`hookops-infra` owns Compose files and cross-service smoke tests.

## Local development

Node.js is pinned in `.nvmrc`.

```bash
nvm install
nvm use
npm ci
```

Common commands:

```bash
npm run format
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

## Package authentication

Current development dependencies are public, so local installation does not
require GitHub Packages credentials. Publishing is performed by CI with a
short-lived `GITHUB_TOKEN`.

For an authorized manual registry operation, set `NODE_AUTH_TOKEN` to a classic
GitHub personal access token. Reading requires `read:packages`; publishing
requires `write:packages`. Never commit the token or place its value directly
in `.npmrc`.
