# Sprint 10 — npm RC Publish & Post-publish Verification

## Status

Done.

## Goal

Publish the first public NoHardText release candidate to npm under the NoHardCoding organization and verify that the installed package works in a fresh project.

## Published Version

```txt
0.1.0-rc.2
```

## npm Organization

```txt
NoHardCoding
```

## npm Scope

```txt
@nohardcoding
```

## Published Packages

- `@nohardcoding/nohardtext-domain@0.1.0-rc.2`
- `@nohardcoding/nohardtext-parser@0.1.0-rc.2`
- `@nohardcoding/nohardtext-rule-engine@0.1.0-rc.2`
- `@nohardcoding/nohardtext-report-engine@0.1.0-rc.2`
- `@nohardcoding/nohardtext-detect-engine@0.1.0-rc.2`
- `@nohardcoding/nohardtext@0.1.0-rc.2`

## CLI Binary

```txt
nohardtext
```

## Install Command

```bash
npm install -D @nohardcoding/nohardtext@rc
```

## Usage

```bash
npx nohardtext --version
npx nohardtext scan src
npx nohardtext scan src --json --output nohardtext-report.json
```

## Post-publish Verification

A fresh install test was completed outside the repository.

Test project:

```txt
D:\MyWork\nohardtext-install-test
```

Commands verified:

```bash
npm init -y
npm install -D @nohardcoding/nohardtext@rc
npx nohardtext --version
npx nohardtext scan src
npx nohardtext scan src --json --output nohardtext-report.json
```

Expected version output:

```txt
NoHardText 0.1.0-rc.2
```

## Dirty Fixture Result

Input:

```tsx
export default function App() {
  return <button>Save</button>;
}
```

Expected result:

- `Findings: 1`
- `NHT1001`
- `Can I ship? No`
- JSON output file is created

Verified.

## Clean Fixture Result

Input:

```tsx
function t(key: string): string {
  return key;
}

export default function App() {
  return <button>{t("actions.save")}</button>;
}
```

Expected result:

- `Findings: 0`
- `Can I ship? Yes`

Verified.

## Dist-tag Note

The RC was published with the `rc` tag.

npm also showed `latest` pointing to `0.1.0-rc.2` after the first publish. Removing `latest` returned a registry `400 Bad Request`, likely because it was the first and only published version at the time.

This is acceptable for the first RC, but the next stable release should publish `0.1.0` and move `latest` to the stable version.

## Acceptance Criteria

- npm organization exists.
- npm scope exists.
- all packages publish successfully.
- `@nohardcoding/nohardtext@rc` installs in a fresh project.
- `npx nohardtext --version` works.
- dirty fixture produces a finding.
- clean fixture produces zero findings.
- JSON output works from the published package.

## Next Sprint

Sprint 11 — Stable Release Decision & Product Roadmap.

Focus:

- decide whether to promote to `0.1.0`
- update `latest` to stable
- add real user/project testing
- prioritize next product feature: auto-fix, VS Code extension, MCP server, or GitHub Action package
