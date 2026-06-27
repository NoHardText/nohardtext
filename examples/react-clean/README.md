# React Clean Example

This example uses localization-style calls and should produce zero findings.

It exists as a clean comparison against `examples/react-basic`.

## Run

From the repository root:

```bash
pnpm build
node packages/cli/dist/index.js scan examples/react-clean/src
```

## JSON Report

```bash
node packages/cli/dist/index.js scan examples/react-clean/src --json --output nohardtext-clean-report.json
```

## Expected Result

This example should produce:

```txt
Findings: 0
Can I ship? Yes
```

## Purpose

Use this example when you want to verify that NoHardText does not flag common localization patterns.
