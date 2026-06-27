# First Release Candidate Checklist

Use this checklist before creating a release candidate.

## Required Commands

Run:

```bash
pnpm build
pnpm test
pnpm release:check
pnpm release:pack
```

All commands must pass.

## CLI Smoke Tests

Run:

```bash
node packages/cli/dist/index.js --help
node packages/cli/dist/index.js --version
node packages/cli/dist/index.js scan examples/react-basic/src
node packages/cli/dist/index.js scan examples/react-basic/src --json --output nohardtext-report.json
node packages/cli/dist/index.js scan examples/react-basic/src --github-annotations --output github-annotations.txt
```

Clean generated files after manual testing:

```bash
rm nohardtext-report.json github-annotations.txt
```

On PowerShell:

```powershell
Remove-Item nohardtext-report.json, github-annotations.txt -Force
```

## Package Metadata

Confirm:

- root package has release scripts
- CLI package has `bin.nohardtext`
- all packages include `dist` in `files`
- all packages point `main` to `dist/index.js`
- all packages point `types` to `dist/index.d.ts`

## Documentation

Confirm docs exist for:

- config
- rule config
- JSON report
- GitHub Actions
- reporting engine
- release checks
- sprint summaries

## Release Candidate Gate

Do not create a release candidate unless:

- tests pass
- package pack check passes
- release check passes
- README is current
- examples are current
- generated temp files are not committed
