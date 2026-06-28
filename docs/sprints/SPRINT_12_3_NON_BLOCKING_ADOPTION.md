# Sprint 12.3 — Non-blocking Adoption Docs

## Status

Done.

## Goal

Document a safe adoption path for NoHardText so teams can evaluate it before using it as a blocking CI gate.

## Why this sprint matters

A review recommended that teams should not immediately adopt NoHardText as a production-blocking CI gate.

The recommended path is to run it in non-blocking observe mode first, validate false-positive rates on the real codebase, tune configuration, and only then enable blocking mode.

This sprint turns that recommendation into official documentation.

## Scope

This sprint adds:

- staged adoption guide
- observe mode commands
- warning mode commands
- blocking mode commands
- GitHub Actions workflow examples
- rollout checklist
- recommended team policy

## Adoption stages

```txt
observe -> review -> tune -> warn -> block
```

## Files added

```txt
docs/engineering/ADOPTION_GUIDE.md
docs/engineering/GITHUB_ACTIONS_ROLLOUT.md
docs/sprints/SPRINT_12_3_NON_BLOCKING_ADOPTION.md
examples/github-actions/nohardtext-observe.yml
examples/github-actions/nohardtext-warning.yml
examples/github-actions/nohardtext-blocking.yml
```

## Acceptance criteria

- New users can run NoHardText without blocking CI.
- Teams understand when to move from observe mode to blocking mode.
- GitHub Actions examples exist for observe, warning, and blocking usage.
- The docs reduce adoption risk for early teams.
- The docs directly address the recommendation to validate NoHardText before production CI blocking.

## Next sprint

Sprint 12.4 — Real-world Scan Quality Suite.

Focus:

- more realistic React component fixtures
- more default custom component text props
- Storybook/docs noise handling
- false-positive regression protection
