# Contributing to NoHardText

Thanks for your interest in contributing to NoHardText.

NoHardText is a focused CLI for detecting hardcoded user-facing strings in React/TSX projects before they reach production.

## Project goals

NoHardText should be:

- high-trust
- CI-friendly
- predictable
- low-noise
- easy to adopt
- transparent in its scoring and reporting

The most important quality rule is:

> A finding should be useful enough that a developer understands why it exists and what to do next.

## Development setup

Requirements:

- Node.js 20 or later
- pnpm 9 or later

Install dependencies:

```bash
pnpm install
```

Build all packages:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

Run release checks:

```bash
pnpm release:version
pnpm release:check
pnpm release:pack
pnpm release:publish-plan
```

## Repository structure

```txt
packages/
  cli/
  detect-engine/
  domain/
  parser/
  report-engine/
  rule-engine/
```

### `packages/cli`

Command-line interface and user-facing scan commands.

### `packages/detect-engine`

Detection rules and rule orchestration.

### `packages/parser`

Parser utilities for extracting JSX text, attributes, and expression strings.

### `packages/report-engine`

Report summaries, localization health score, grades, top issues, and ship decisions.

### `packages/rule-engine`

Rule execution helpers.

### `packages/domain`

Shared domain types.

## Adding or changing detection behavior

Detection behavior must be covered by tests.

For any new detection rule or parser behavior, include at least one test for:

- the positive case that should be detected
- the clean case that should not be detected
- a realistic edge case if applicable

Prefer adding scan quality regression coverage when a change affects false positives or false negatives.

## False positives

False positives are treated seriously.

Before adding broader detection, ask:

- Is this text clearly user-facing?
- Is the rule likely to create noise in common React projects?
- Should this behavior be opt-in through config instead of default?
- Is there an established i18n pattern that should be ignored?

Default behavior should favor high trust over maximum coverage.

## False negatives

False negatives should be fixed when the text is clearly user-facing and the detection can be implemented without creating unacceptable noise.

When in doubt, add the behavior behind configuration first.

## Score methodology

The localization health score must stay explainable.

If you change score weights, grade thresholds, or ship decision behavior, update:

```txt
docs/engineering/SCORE_METHODOLOGY.md
```

and add/update tests in:

```txt
packages/report-engine
```

## Documentation changes

Documentation should be updated whenever user-facing behavior changes.

Common docs to update:

- `README.md`
- `CHANGELOG.md`
- `docs/engineering/SCORE_METHODOLOGY.md`
- release notes under `docs/releases/`

## Pull request checklist

Before opening a pull request, run:

```bash
pnpm build
pnpm test
pnpm release:version
pnpm release:check
pnpm release:pack
pnpm release:publish-plan
```

A pull request should include:

- a clear description of the change
- tests for behavior changes
- docs for user-facing changes
- changelog entry when relevant

## Versioning

NoHardText follows semantic versioning after `0.1.0`.

General guidance:

- patch: bug fixes, documentation fixes, small detection quality improvements
- minor: new rules, new output options, new integrations
- major: breaking CLI, report schema, or configuration changes

## Security

NoHardText is designed to run locally and in CI.

Do not add network calls to the scan path without a clear reason and explicit documentation.

If you discover a security issue, do not open a public issue with exploit details. Use a private disclosure path when one is available.

## License

By contributing, you agree that your contributions are licensed under the MIT License.
