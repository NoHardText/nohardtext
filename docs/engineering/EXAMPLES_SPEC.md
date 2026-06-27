# Examples Spec

## Purpose

NoHardText examples are used for manual checks, documentation, demos, and release confidence.

The examples should be small, easy to understand, and deterministic.

## Examples

## react-basic

Path:

```txt
examples/react-basic/src
```

Purpose:

- Demonstrates hardcoded user-facing strings.
- Should produce findings.
- Should usually produce a `Can I ship? No` decision.

Useful command:

```bash
node packages/cli/dist/index.js scan examples/react-basic/src
```

## react-clean

Path:

```txt
examples/react-clean/src
```

Purpose:

- Demonstrates localization-style calls.
- Should produce zero findings.
- Should usually produce a `Can I ship? Yes` decision.

Useful command:

```bash
node packages/cli/dist/index.js scan examples/react-clean/src
```

## Example Rules

Examples should not require external dependencies.

Examples should avoid framework setup unless it is needed for detection behavior.

Examples should keep source code intentionally small.

## Release Checks

Before a release candidate, manually verify:

```bash
pnpm build
node packages/cli/dist/index.js scan examples/react-basic/src
node packages/cli/dist/index.js scan examples/react-clean/src
```

Expected:

- `react-basic` produces findings.
- `react-clean` produces zero findings.
