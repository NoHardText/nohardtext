# Sprint 3 — Real-world Detection

## Status

Done.

## Goal

Improve NoHardText detection quality on realistic React code by reducing false positives and supporting common JSX patterns used in real projects.

## Completed

- Reduced false positives for technical-looking strings.
- Ignored symbols, numeric-only strings, URLs, emails, versions, and technical tokens.
- Added detection for JSX expression strings.
- Added detection for nested JSX expression strings.
- Added detection for conditional and logical JSX expression strings.
- Added detection for static JSX attribute expression strings.
- Added support for template literal strings without expressions.
- Added accessibility categories for `aria-label` and `alt` rules.
- Added `NHT1006` for common custom component text props.
- Limited component text prop detection to custom components only.
- Added configurable component text props through `nohardtext.config.json`.
- Sorted findings by source location.
- Added real-world React component test coverage.
- Added tests to ignore localization calls such as `t("key")`, `i18n.t("key")`, and `translate("key")`.
- Added tests to ignore common technical props.

## Current Built-in Rules

| Rule ID | Name | Category | Severity |
|---|---|---|---|
| NHT1001 | JSX Text | localization | high |
| NHT1002 | Placeholder Attribute | localization | high |
| NHT1003 | Title Attribute | localization | high |
| NHT1004 | ARIA Label | accessibility | high |
| NHT1005 | Alt Attribute | accessibility | high |
| NHT1006 | Component Text Prop | localization | high |

## Supported Real-world Patterns

```tsx
<h1>Welcome</h1>
<button>{isSaving ? "Saving..." : "Save"}</button>
<span>{hasResults && "Results ready"}</span>
<Button label="Create Project" />
<Toast message="Saved successfully" />
<input placeholder={"Search..."} />
<img alt={`Game logo`} />
```

## Ignored Patterns

```tsx
<span>v2.0</span>
<span>|</span>
<div className="hero" />
<div data-testid="dashboard-root" />
<h1>{t("dashboard.title")}</h1>
<p>{i18n.t("dashboard.subtitle")}</p>
```

## Config Support Used

```json
{
  "componentTextProps": ["message", "text"]
}
```

## Notes

Some CI and JSON reporting work was also completed during this sprint, even though it belongs more naturally to later CI/reporting sprints.

## Next Sprint

Sprint 4 — Config System.

Focus:

- Formalize config shape.
- Add config validation.
- Add rule enable/disable support.
- Add rule severity overrides.
- Keep CLI behavior predictable and testable.
