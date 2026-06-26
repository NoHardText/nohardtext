# NoHardText Config Spec

NoHardText supports a lightweight JSON config file at the project root:

```txt
nohardtext.config.json

Current Shape

{
  "ignore": [
    "node_modules",
    "dist",
    "coverage",
    ".git",
    ".next",
    "build",
    "out"
  ],
  "failOn": "high"
}
Fields
ignore

A list of directory names that NoHardText should skip during scan.

Default ignored directories:

node_modules
dist
coverage
.git
.next
build
out

Custom ignored directories are merged with the defaults.

Example:

{
  "ignore": ["storybook-static"]
}
failOn

Optional severity threshold for CI failure.

Allowed values:

info
low
medium
high
critical

Example:

{
  "failOn": "high"
}

This means the CLI should fail if it finds any finding with severity high or critical.

CLI flag takes priority over config:

nohardtext scan src --fail-on critical
Future Fields

Planned:

{
  "rules": {
    "NHT1001": "error",
    "NHT1002": "off"
  },
  "locales": ["en", "ar"],
  "sourceLocale": "en",
  "translationFiles": ["src/locales/*.json"]
}

'@


---

## 2. أضيفي Sprint 2 Summary

```powershell
New-Item -ItemType Directory -Force -Path docs\sprints

Set-Content -Path docs\sprints\SPRINT_2_RULE_SYSTEM_CLEANUP.md -Value @'
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
Config Support
{
  "ignore": ["storybook-static"],
  "failOn": "high"
}
Next Sprint

Sprint 3 — Real-world Detection.

Focus:

Reduce false positives.
Ignore non-user-facing strings.
Support expression cases safely.
Add stronger React detection.
Add tests based on realistic components.
'@