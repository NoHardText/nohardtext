# React Basic Example

This example intentionally contains hardcoded user-facing text.

It exists so NoHardText can demonstrate real findings.

## Run

From the repository root:

```bash
pnpm build
node packages/cli/dist/index.js scan examples/react-basic/src
```

## JSON Report

```bash
node packages/cli/dist/index.js scan examples/react-basic/src --json --output nohardtext-report.json
```

## GitHub Annotations

```bash
node packages/cli/dist/index.js scan examples/react-basic/src --github-annotations --output github-annotations.txt
```

## Expected Result

This example should produce findings for patterns such as:

```tsx
<h1>Welcome</h1>
<button title="Start the game" aria-label="Start button">
  Start Game
</button>
<input placeholder="Search..." />
<img src="/logo.png" alt="Game logo" />
```

The expected ship decision is usually:

```txt
Can I ship? No
```

## Purpose

Use this example when you want to verify that NoHardText detects hardcoded UI strings correctly.
