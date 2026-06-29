# Sprint 13 — ESLint Plugin MVP

## Status

Ready for implementation.

## Goal

Add a first official ESLint plugin package for NoHardText.

The MVP exposes one rule:

```txt
nohardtext/no-hardcoded-ui-strings
```

## Why this matters

The CLI is good for CI, but teams also expect localization quality checks to appear in normal lint workflows.

This sprint starts that path without adding auto-fix or complex configuration yet.

## Files added

```txt
packages/eslint-plugin/package.json
packages/eslint-plugin/tsconfig.json
packages/eslint-plugin/src/index.ts
packages/eslint-plugin/src/index.test.ts
docs/engineering/ESLINT_PLUGIN.md
docs/sprints/SPRINT_13_ESLINT_PLUGIN_MVP.md
examples/eslint/eslint.config.js
```

## Files changed

```txt
scripts/version-check.cjs
scripts/package-dry-run.cjs
scripts/publish-plan.cjs
```

## Acceptance criteria

- ESLint plugin package builds.
- ESLint plugin package tests pass.
- Root `pnpm build` includes the plugin.
- Root `pnpm test` includes the plugin.
- Release version check includes the plugin.
- Package dry-run includes the plugin.
- Publish plan includes the plugin.
- Documentation explains recommended flat config usage.

## Not included yet

- auto-fix
- plugin-specific options
- custom component prop options
- legacy `.eslintrc` documentation
- published patch release
