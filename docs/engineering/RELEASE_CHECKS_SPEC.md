# Release Checks Spec

## Purpose

NoHardText release checks are designed to catch broken builds, broken tests, broken CLI behavior, and broken package metadata before a release is created.

## Scripts

## release:check

Command:

```bash
pnpm release:check
```

### Responsibilities

`release:check` validates runtime behavior.

It runs:

```bash
pnpm build
pnpm test
node packages/cli/dist/index.js --version
node packages/cli/dist/index.js --help
```

Then it creates temporary fixtures and validates CLI scan behavior.

## Dirty Fixture

The dirty fixture contains hardcoded JSX text:

```tsx
export default function App() {
  return <button>Save</button>;
}
```

Expected result:

- JSON report is created.
- `findings.length` is greater than 0.
- `summary.totalFindings` matches findings count.
- `summary.topIssues` is not empty.
- `summary.shipDecision` is `"no"`.
- GitHub annotations contain an error annotation.
- GitHub annotations contain `NHT1001`.

## Clean Fixture

The clean fixture uses a localization call:

```tsx
export default function App() {
  return <button>{t("actions.save")}</button>;
}
```

Expected result:

- JSON report is created.
- `findings.length` is 0.
- `summary.totalFindings` is 0.
- `summary.topIssues` is empty.
- `summary.shipDecision` is `"yes"`.

## release:pack

Command:

```bash
pnpm release:pack
```

### Responsibilities

`release:pack` validates package publishing readiness.

It runs:

```bash
pnpm build
```

Then it validates every package:

- package name matches expectation
- `dist` exists
- `main` is `dist/index.js`
- `types` is `dist/index.d.ts`
- `files` includes `dist`
- CLI package exposes `bin.nohardtext`
- package can be packed successfully

## Temporary Files

Release scripts may create temporary folders:

- `.nohardtext-release-check`
- `.nohardtext-pack-check`

These folders are cleaned automatically at the end of the script.

They should not be committed.

## Design Rules

Release checks should be:

- deterministic
- local-only
- safe to run repeatedly
- independent from GitHub Actions
- useful before every release tag

Release checks should not:

- publish packages
- create Git tags
- push to GitHub
- require external services
