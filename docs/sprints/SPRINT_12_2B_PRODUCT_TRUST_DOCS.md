# Sprint 12.2B — Product Trust Documentation

## Status

Done.

## Goal

Close repository trust gaps that make NoHardText look like a project instead of a product.

## Issues addressed

A review highlighted several product trust gaps:

- unused empty `turbo.json`
- release notes were too thin
- missing `CHANGELOG.md`
- missing `CONTRIBUTING.md`

## Decisions

### Turborepo

NoHardText currently uses `pnpm -r` for workspace orchestration.

The empty `turbo.json` should be removed unless Turborepo is intentionally added and wired into root scripts.

Current decision:

```txt
Use pnpm workspaces explicitly.
Remove unused turbo.json.
Do not claim Turborepo orchestration.
```

### Release notes

Release notes should explain:

- what changed
- what rules are included
- install command
- rollout recommendation
- known limitations

### Changelog

Add `CHANGELOG.md` so future releases have a clear history.

### Contributing

Add `CONTRIBUTING.md` so external users understand how to work with the repo and how quality standards are enforced.

## Files added

```txt
CHANGELOG.md
CONTRIBUTING.md
docs/releases/0.1.0.md
docs/sprints/SPRINT_12_2B_PRODUCT_TRUST_DOCS.md
```

## File removed

```txt
turbo.json
```

Only remove `turbo.json` if it is empty and Turborepo is not installed or used by root scripts.

## Acceptance criteria

- `CHANGELOG.md` exists.
- `CONTRIBUTING.md` exists.
- Release notes are detailed.
- Empty `turbo.json` is removed.
- README and package scripts do not claim Turborepo orchestration unless it is actually wired.
- Build and tests pass.
