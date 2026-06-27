# NoHardText

**Never ship hardcoded UI strings again.**

NoHardText is a focused CLI that detects hardcoded user-facing text in React/TSX projects before it reaches production.

It helps frontend teams answer one release-critical question:

> Can I ship this UI without hardcoded localization text?

## Status

Stable `0.1.0`.

The core scan is intended to stay free so developers and teams can adopt it easily in local development and CI.

## Install

```bash
npm install -D @nohardcoding/nohardtext
```

Run a scan:

```bash
npx nohardtext scan src
```

Check the installed version:

```bash
npx nohardtext --version
```

Use it without adding it to a project:

```bash
npx --package @nohardcoding/nohardtext nohardtext scan src
```

## What it detects

```tsx
// ❌ Hardcoded UI text
export default function App() {
  return <button>Save</button>;
}
```

```txt
NHT1001 - JSX Text
Hardcoded JSX text found: "Save"
Can I ship? No
```

Localized code is allowed:

```tsx
// ✅ Localized UI text
export default function App() {
  return <button>{t("actions.save")}</button>;
}
```

```txt
Findings: 0
Can I ship? Yes
```

## Current rules

| Rule ID | Rule | Category | Default severity | Description |
|---|---|---|---|---|
| `NHT1001` | JSX Text | localization | high | Detects hardcoded user-facing text inside JSX nodes |
| `NHT1002` | Placeholder Attribute | localization | high | Detects hardcoded placeholder attribute values |
| `NHT1003` | Title Attribute | localization | high | Detects hardcoded title attribute values |
| `NHT1004` | ARIA Label | accessibility | high | Detects hardcoded `aria-label` attribute values |
| `NHT1005` | Alt Attribute | accessibility | high | Detects hardcoded image `alt` text |
| `NHT1006` | Component Text Prop | localization | high | Detects hardcoded text passed through common custom component props |

## Supported patterns

NoHardText currently supports:

- React / TSX scanning
- JSX text detection
- static JSX attribute detection
- static JSX expression strings
- conditional and logical expression strings
- common localization call ignores
- React Intl patterns
- React i18next `<Trans />` patterns
- custom component text prop detection
- JSON reports
- GitHub Actions annotation output
- CI failure thresholds
- rule configuration
- localization health score
- release safety checks
- scan quality regression tests

## CLI usage

Scan a path:

```bash
npx nohardtext scan src
```

Print JSON output:

```bash
npx nohardtext scan src --json
```

Write JSON output to a file:

```bash
npx nohardtext scan src --json --output nohardtext-report.json
```

Print GitHub Actions annotations:

```bash
npx nohardtext scan src --github-annotations --fail-on high
```

Fail CI on a severity threshold:

```bash
npx nohardtext scan src --fail-on high
```

Allowed severities: `info`, `low`, `medium`, `high`, `critical`.

List supported rules:

```bash
npx nohardtext rules
```

Show help:

```bash
npx nohardtext --help
```

## Example output

```txt
NoHardText CLI

Scanned files: 1
Findings: 1
Can I ship? No
Reason: 1 high-severity localization findings found.
Localization grade: A
Localization score: 88 / 100

Top issues:
  NHT1001 - JSX Text: 1 finding (high, localization)
    Example: Hardcoded JSX text found: "Save"
```

## JSON report

```bash
npx nohardtext scan src --json --output nohardtext-report.json
```

The JSON report includes schema version, generation time, scanned files, findings, severity summary, rule breakdown, category breakdown, top issues, localization health score, ship decision, and CI metadata.

## GitHub Actions

NoHardText can emit GitHub Actions annotation syntax:

```bash
npx nohardtext scan src --github-annotations --fail-on high
```

Basic workflow example:

```yaml
name: NoHardText

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  nohardtext:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install -D @nohardcoding/nohardtext

      - run: npx nohardtext scan src --github-annotations --fail-on high
```

A dedicated GitHub Action package is planned.

## Configuration

NoHardText supports a root config file:

```txt
nohardtext.config.json
```

Example:

```json
{
  "ignore": ["storybook-static"],
  "failOn": "high",
  "componentTextProps": ["message", "text"],
  "rules": {
    "NHT1001": "high",
    "NHT1002": "medium",
    "NHT1003": "off"
  }
}
```

## Examples

Scan the intentionally dirty React example:

```bash
npx nohardtext scan examples/react-basic/src
```

Scan the clean localized example:

```bash
npx nohardtext scan examples/react-clean/src
```

## Development

```bash
pnpm install
pnpm build
pnpm typecheck
pnpm test
```

Run release safety checks:

```bash
pnpm release:version
pnpm release:check
pnpm release:pack
pnpm release:rc
pnpm release:publish-plan
```

## Packages

- `@nohardcoding/nohardtext`
- `@nohardcoding/nohardtext-detect-engine`
- `@nohardcoding/nohardtext-parser`
- `@nohardcoding/nohardtext-report-engine`
- `@nohardcoding/nohardtext-rule-engine`
- `@nohardcoding/nohardtext-domain`

## Product direction

NoHardText is designed to become the quality gate for localization in frontend projects.

Planned work:

- official GitHub Action
- stronger real-world scan coverage
- auto-fix suggestions
- VS Code extension
- hosted reporting
- team dashboards
- PR comments
- release trend reports

## Paid support

The core CLI scan is free.

Paid services and future paid features may include localization audits, NoHardText setup help, CI integration, team reporting, managed dashboards, PR comments, and scan history.

## License

MIT License.

Copyright (c) 2026 Reham Mohamed
