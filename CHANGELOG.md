# Changelog

All notable changes to NoHardText will be documented in this file.

The format is inspired by Keep a Changelog, and this project follows semantic versioning after the first stable release.

## [0.1.0] - 2026-06-27

### Added

- Stable first public release of NoHardText.
- Published CLI package as `@nohardcoding/nohardtext`.
- Published internal packages under the `@nohardcoding` npm scope.
- Added React/TSX scan support.
- Added hardcoded JSX text detection with rule `NHT1001`.
- Added placeholder attribute detection with rule `NHT1002`.
- Added title attribute detection with rule `NHT1003`.
- Added `aria-label` detection with rule `NHT1004`.
- Added image `alt` text detection with rule `NHT1005`.
- Added custom component text prop detection with rule `NHT1006`.
- Added configurable severities and per-rule disable support.
- Added `componentTextProps` configuration for project-specific component APIs.
- Added JSON report output.
- Added GitHub Actions annotation output.
- Added CI failure thresholds through `--fail-on`.
- Added localization health score and grade.
- Added ship decision output.
- Added top issue grouping.
- Added rule and category breakdowns.
- Added release verification scripts.
- Added package dry-run checks.
- Added scan quality regression coverage.
- Added MIT license.

### Changed

- Promoted the project from release-candidate status to stable `0.1.0`.
- Updated package names to the `@nohardcoding` npm scope.
- Updated documentation to recommend npm installation through `@nohardcoding/nohardtext`.

### Notes

NoHardText `0.1.0` is suitable for evaluation on React/TSX projects.

For production teams, the recommended adoption path is to start in non-blocking observe mode, review false positives on the real codebase, tune configuration, and only then enable a blocking CI threshold.

### Install

```bash
npm install -D @nohardcoding/nohardtext
```

### Run

```bash
npx nohardtext scan src
```

### Observe mode

```bash
npx nohardtext scan src --json --output nohardtext-report.json
```

### Blocking CI mode

```bash
npx nohardtext scan src --fail-on high
```
