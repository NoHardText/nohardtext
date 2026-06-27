# Sprint 7 — Developer Experience & Package Polish

## Status

Done.

## Goal

Improve release readiness and developer experience for the NoHardText monorepo before moving toward a first usable release.

## Completed

- Added package metadata polish across workspace packages.
- Added CLI binary metadata for the `nohardtext` command.
- Added package publishing fields such as `main`, `types`, `exports`, and `files`.
- Added package metadata tests for the CLI package.
- Added `release:check` script.
- Added `release:pack` script.
- Added smoke tests for:
  - build
  - test
  - CLI version output
  - CLI help output
  - JSON scan output
  - GitHub annotations output
  - dirty fixture detection
  - clean fixture with localization call
- Added package pack checks for all packages.
- Ensured pack artifacts are written to a temporary folder and cleaned automatically.

## Release Scripts

### release:check

Runs a full release safety check:

```bash
pnpm release:check
```

This validates:

- build passes
- tests pass
- CLI `--version` works
- CLI `--help` works
- JSON report output works
- GitHub annotation output works
- dirty fixture produces findings
- clean fixture produces zero findings

### release:pack

Runs a packaging safety check:

```bash
pnpm release:pack
```

This validates:

- build passes
- each package has a `dist` folder
- each package has valid `main`
- each package has valid `types`
- each package includes `dist` in `files`
- CLI package exposes the `nohardtext` binary
- every package can be packed successfully

## Package Readiness

Workspace packages now have release-oriented metadata:

- `@nohardtext/domain`
- `@nohardtext/parser`
- `@nohardtext/rule-engine`
- `@nohardtext/detect-engine`
- `@nohardtext/report-engine`
- `@nohardtext/cli`

## Acceptance Criteria

- `pnpm build` passes.
- `pnpm test` passes.
- `pnpm release:check` passes.
- `pnpm release:pack` passes.
- CLI binary metadata exists.
- Package metadata is consistent.
- No release-check temporary files remain after scripts finish.

## Next Sprint

Sprint 8 — README, Examples & First Release Candidate.

Focus:

- README polish
- example project cleanup
- final install/usage documentation
- release checklist
- first RC tag
- final manual CLI review
