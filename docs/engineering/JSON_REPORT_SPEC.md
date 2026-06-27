# NoHardText JSON Report Spec

NoHardText can emit a JSON report using:

```bash
nohardtext scan src --json
```

It can also write the report to a file:

```bash
nohardtext scan src --json --output nohardtext-report.json
```

## Current Schema

```json
{
  "schemaVersion": "1.0",
  "tool": {
    "name": "NoHardText",
    "version": "0.0.0"
  },
  "scannedFiles": 1,
  "findings": [],
  "summary": {
    "totalFindings": 0,
    "critical": 0,
    "high": 0,
    "medium": 0,
    "low": 0,
    "info": 0,
    "healthScore": {
      "score": 100,
      "grade": "AAA"
    },
    "shipDecision": "yes",
    "shipReason": "No blocking localization findings found."
  },
  "ci": {
    "enabled": false,
    "passed": true
  }
}
```

## Fields

### schemaVersion

The JSON schema version for this report format.

Current value:

```txt
1.0
```

### tool

Metadata about the tool that generated the report.

```json
{
  "name": "NoHardText",
  "version": "0.0.0"
}
```

### scannedFiles

The number of source files scanned.

### findings

A list of detected localization findings.

Each finding currently includes:

- `id`
- `ruleId`
- `severity`
- `category`
- `message`
- `explanation`
- `location`
- `fixable`
- `suggestions`

Example finding shape:

```json
{
  "id": "src/App.tsx:NHT1001:4:11:0",
  "ruleId": "NHT1001",
  "severity": "high",
  "category": "localization",
  "message": "Hardcoded JSX text found: \"Welcome\"",
  "explanation": "User-facing JSX text should be moved to localization files.",
  "location": {
    "filePath": "src/App.tsx",
    "startLine": 4,
    "startColumn": 11,
    "endLine": 4,
    "endColumn": 18
  },
  "fixable": true,
  "suggestions": [
    {
      "message": "Move this JSX text to a localization key."
    }
  ]
}
```

### summary

Aggregated scan result.

Includes:

- total finding count
- severity counts
- localization health score
- localization grade
- release decision
- release decision reason

Example:

```json
{
  "totalFindings": 0,
  "critical": 0,
  "high": 0,
  "medium": 0,
  "low": 0,
  "info": 0,
  "healthScore": {
    "score": 100,
    "grade": "AAA"
  },
  "shipDecision": "yes",
  "shipReason": "No blocking localization findings found."
}
```

### ci

CI-oriented metadata.

When `--fail-on` is not used:

```json
{
  "enabled": false,
  "passed": true
}
```

When `--fail-on high` is used and high or critical findings exist:

```json
{
  "enabled": true,
  "failOn": "high",
  "passed": false
}
```

## Exit Code Behavior

When `--fail-on` is provided and the scan finds matching or higher-severity findings, the CLI exits with code `1`.

Example:

```bash
nohardtext scan src --fail-on high
```

If any `high` or `critical` findings exist, CI should fail.

## Intended Consumers

The JSON report is designed for:

- GitHub Actions
- CI pipelines
- VS Code extension
- MCP server
- dashboards
- future hosted reporting

## Notes

The schema is currently versioned as `1.0`.

Future schema changes should either remain backward-compatible or introduce a new `schemaVersion`.
