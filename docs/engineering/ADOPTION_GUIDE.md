# NoHardText Adoption Guide

NoHardText is designed to become a trusted localization quality gate for React/TSX projects.

For existing teams, the recommended rollout is staged. Do not start by blocking production CI on day one.

## Why staged adoption matters

Static analysis tools need trust.

Before a team blocks pull requests, it should understand:

- what NoHardText detects
- what it intentionally ignores
- how many findings exist in the current codebase
- whether any false positives appear
- which rules should be tuned for the project
- whether the team is ready to enforce the result in CI

The safest adoption path is:

```txt
observe -> review -> tune -> warn -> block
```

## Stage 1 — Local evaluation

Install NoHardText:

```bash
npm install -D @nohardcoding/nohardtext
```

Run a local scan:

```bash
npx nohardtext scan src
```

Run with JSON output:

```bash
npx nohardtext scan src --json --output nohardtext-report.json
```

Use this stage to answer:

- Are the findings understandable?
- Are the rule IDs useful?
- Are there obvious false positives?
- Are common i18n patterns ignored correctly?
- Which directories should be ignored?

## Stage 2 — Observe mode in CI

Observe mode means NoHardText runs in CI, but it does not block the build.

Use this when introducing NoHardText to an existing codebase.

```bash
npx nohardtext scan src --json --output nohardtext-report.json || true
```

This creates a report while allowing CI to pass.

A better observe-mode workflow can upload the JSON report as an artifact.

## Stage 3 — Warning mode

After the team reviews the initial results, start showing findings more visibly.

```bash
npx nohardtext scan src --github-annotations || true
```

This prints GitHub Actions annotations without failing CI.

Use this stage to make findings visible in pull requests while still avoiding disruption.

## Stage 4 — Blocking mode

After the team trusts the result quality, enable blocking mode.

```bash
npx nohardtext scan src --github-annotations --fail-on high
```

This fails CI on high-severity or critical findings.

For stricter teams:

```bash
npx nohardtext scan src --github-annotations --fail-on medium
```

## Recommended timeline

For a small React project:

```txt
Day 1: local scan
Day 2: observe mode in CI
Week 1: review findings and tune config
Week 2: warning mode
Week 3+: blocking mode
```

For a larger product:

```txt
Week 1: local and branch-based evaluation
Week 2: observe mode on main branch
Weeks 3-4: triage existing findings
Week 5+: block new high-severity findings
```

## Example configuration

Create:

```txt
nohardtext.config.json
```

Example:

```json
{
  "ignore": ["storybook-static", "coverage"],
  "failOn": "high",
  "componentTextProps": ["message", "text", "errorMessage", "loadingText"],
  "rules": {
    "NHT1001": "high",
    "NHT1002": "high",
    "NHT1003": "medium"
  }
}
```

## When to use observe mode

Use observe mode when:

- introducing NoHardText to an existing project
- evaluating false-positive rates
- scanning a large legacy codebase
- trying new detection rules
- preparing a team for a future blocking gate

## When to use blocking mode

Use blocking mode when:

- the team agrees on localization standards
- false positives are low
- existing findings are triaged
- the rules are configured for the project
- developers understand how to fix findings

## Suggested policy

A practical team policy:

```txt
Existing findings can be tracked.
New high-severity findings should not be introduced.
CI blocks only after the team has completed observe mode.
```

## Production CI recommendation

For production CI, start with:

```bash
npx nohardtext scan src --github-annotations --fail-on high
```

This blocks the most important findings while avoiding overly aggressive enforcement.

## What not to do

Avoid starting with:

```bash
npx nohardtext scan src --fail-on low
```

on a large existing codebase.

That can create too much noise and reduce trust.

## Adoption checklist

Before enabling blocking mode:

- [ ] NoHardText runs locally.
- [ ] NoHardText runs in CI observe mode.
- [ ] JSON report is generated successfully.
- [ ] GitHub annotations work.
- [ ] Team reviewed at least one real report.
- [ ] Ignore paths are configured.
- [ ] Component text props are configured if needed.
- [ ] False positives are accepted or fixed.
- [ ] Team agrees on `failOn` threshold.
- [ ] Blocking mode is enabled.
