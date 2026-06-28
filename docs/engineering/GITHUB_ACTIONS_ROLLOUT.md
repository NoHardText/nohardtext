# NoHardText GitHub Actions Rollout

This guide shows how to run NoHardText in GitHub Actions before the official reusable GitHub Action package exists.

## Observe mode

Observe mode runs NoHardText and uploads a JSON report without blocking CI.

```yaml
name: NoHardText Observe

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  nohardtext:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install -D @nohardcoding/nohardtext

      - name: Run NoHardText in observe mode
        run: npx nohardtext scan src --json --output nohardtext-report.json || true

      - name: Upload NoHardText report
        uses: actions/upload-artifact@v4
        with:
          name: nohardtext-report
          path: nohardtext-report.json
```

## Warning mode

Warning mode prints GitHub annotations but does not fail CI.

```yaml
name: NoHardText Warning

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  nohardtext:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install -D @nohardcoding/nohardtext

      - name: Run NoHardText warning annotations
        run: npx nohardtext scan src --github-annotations || true
```

## Blocking mode

Blocking mode fails CI when findings meet or exceed the selected severity threshold.

```yaml
name: NoHardText

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  nohardtext:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install -D @nohardcoding/nohardtext

      - name: Run NoHardText
        run: npx nohardtext scan src --github-annotations --fail-on high
```

## Recommended rollout

Use the workflows in this order:

```txt
Observe mode
Warning mode
Blocking mode
```

Do not use blocking mode on a large legacy codebase before reviewing the first report.
