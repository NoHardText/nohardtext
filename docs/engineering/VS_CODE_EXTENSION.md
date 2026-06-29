# NoHardText VS Code Extension

The NoHardText VS Code extension provides a first editor integration for running NoHardText from a workspace.

Package:

```txt
@nohardcoding/nohardtext-vscode
```

The package is private in the monorepo for now and is not published yet.

## MVP command

The MVP contributes one command:

```txt
NoHardText: Scan Workspace
```

Command id:

```txt
nohardtext.scanWorkspace
```

The command runs the published CLI with `npx` and prints results to a VS Code output channel named `NoHardText`.

## Settings

```json
{
  "nohardtext.scanPath": "src",
  "nohardtext.packageVersion": "latest"
}
```

## Development

Build the extension package:

```bash
pnpm --filter @nohardcoding/nohardtext-vscode build
```

Typecheck:

```bash
pnpm --filter @nohardcoding/nohardtext-vscode typecheck
```

## Current limitations

This MVP intentionally does not include inline diagnostics, problem matcher integration, quick fixes, auto-fix, marketplace packaging, or extension tests.
