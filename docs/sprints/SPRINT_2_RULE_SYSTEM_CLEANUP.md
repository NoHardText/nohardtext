# Sprint 2 — Rule System Cleanup

## Status

Done.

## Goal

Make the rule system organized, metadata-driven, and ready for configuration, CI, and future integrations.

## Completed

- Split built-in rules into separate files.
- Added reusable string attribute detection helper.
- Added rule metadata model.
- Added built-in rule registry.
- Added CLI command to list supported rules.
- Enriched scan output with rule name, severity, and category.
- Added "Can I ship?" release decision.
- Added JSON scan output.
- Added `--fail-on` severity option for CI.
- Added default ignored directories.
- Added lightweight config support through `nohardtext.config.json`.

## Current Built-in Rules

| Rule ID | Name | Category | Severity |
|---|---|---|---|
| NHT1001 | JSX Text | localization | high |
| NHT1002 | Placeholder Attribute | localization | high |
| NHT1003 | Title Attribute | localization | high |
| NHT1004 | ARIA Label | accessibility | high |
| NHT1005 | Alt Attribute | accessibility | high |

## CLI Capabilities

```bash
nohardtext scan src
nohardtext scan src --json
nohardtext scan src --fail-on high
nohardtext rules
```

## Config Support

```json
{
  "ignore": ["storybook-static"],
  "failOn": "high"
}
```

## Next Sprint

Sprint 3 — Real-world Detection.

Focus:

- Reduce false positives.
- Ignore non-user-facing strings.
- Support expression cases safely.
- Add stronger React detection.
- Add tests based on realistic components.
