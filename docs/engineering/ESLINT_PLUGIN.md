# NoHardText ESLint Plugin

NoHardText provides an ESLint plugin package for teams that prefer editor and lint workflow integration instead of running only the CLI.

Package:

```txt
@nohardcoding/eslint-plugin-nohardtext
```

## Rule

```txt
nohardtext/no-hardcoded-ui-strings
```

The rule runs NoHardText detection against each linted file and reports findings through ESLint.

## Flat config usage

```js
import nohardtext from "@nohardcoding/eslint-plugin-nohardtext";

export default [
  {
    files: ["**/*.{jsx,tsx}"],
    ...nohardtext.configs.recommended,
  },
];
```

## Manual flat config usage

```js
import nohardtext from "@nohardcoding/eslint-plugin-nohardtext";

export default [
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      nohardtext,
    },
    rules: {
      "nohardtext/no-hardcoded-ui-strings": "error",
    },
  },
];
```

## Recommended rollout

Start with warnings first:

```js
rules: {
  "nohardtext/no-hardcoded-ui-strings": "warn",
}
```

Then move to errors after the team validates false-positive rates:

```js
rules: {
  "nohardtext/no-hardcoded-ui-strings": "error",
}
```

## Current limitations

This MVP intentionally keeps the rule small:

- no auto-fix yet
- no custom rule options yet
- no per-rule severity mapping yet
- no custom component prop options yet

Those should be added after the MVP passes package, lint, and integration checks.
