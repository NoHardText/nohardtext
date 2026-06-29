# Sprint 12.5B — README GitHub Action Cleanup

## Status

Ready for implementation.

## Goal

Update the README after adding the official reusable GitHub Action.

## Issues fixed

The README still said:

```txt
A dedicated GitHub Action package is planned.
```

That is no longer accurate because the repository now includes `action.yml`.

The README also listed the official GitHub Action as planned work, even though it is now implemented.

## Changes

- Adds an official reusable GitHub Action section.
- Keeps the existing CLI annotation workflow example.
- Adds a staged adoption section.
- Moves official GitHub Action from planned work to completed foundations.
- Removes `pnpm release:rc` from the stable release safety command list.
- Reflows README into normal multiline Markdown for maintainability.

## Files changed

```txt
README.md
docs/sprints/SPRINT_12_5B_README_GITHUB_ACTION_CLEANUP.md
```

## Acceptance criteria

- README no longer says the GitHub Action is planned.
- README documents `uses: nohardcoding-git/nohardtext@main`.
- README recommends release tag pinning for production usage.
- README product direction reflects completed vs planned work accurately.
- Full checks pass.
