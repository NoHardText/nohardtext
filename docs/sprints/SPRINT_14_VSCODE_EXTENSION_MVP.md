# Sprint 14 — VS Code Extension MVP

## Status

Ready for implementation.

## Goal

Add a first VS Code extension package for NoHardText.

The MVP provides a command that runs NoHardText from the current workspace and prints results to an output channel.

## Files added

```txt
packages/vscode-extension/package.json
packages/vscode-extension/tsconfig.json
packages/vscode-extension/src/extension.ts
docs/engineering/VS_CODE_EXTENSION.md
docs/sprints/SPRINT_14_VSCODE_EXTENSION_MVP.md
```

## Acceptance criteria

- VS Code extension package exists.
- Extension package is private.
- Extension builds with tsup.
- Extension typechecks.
- Root `pnpm build` includes the extension package.
- Root checks still pass.
- Extension contributes command `NoHardText: Scan Workspace`.
- Extension runs the published CLI using `npx`.
- Results are shown in a `NoHardText` output channel.

## Not included yet

- diagnostics
- quick fixes
- auto-fix
- marketplace packaging
- extension integration tests
