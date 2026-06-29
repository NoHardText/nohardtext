import { describe, expect, it } from "vitest";
import plugin from "./index";

interface Report {
  messageId: string;
  data: {
    message: string;
  };
  loc: {
    start: {
      line: number;
      column: number;
    };
    end: {
      line: number;
      column: number;
    };
  };
}

function runRule(sourceText: string): Report[] {
  const reports: Report[] = [];
  const rule = plugin.rules["no-hardcoded-ui-strings"];

  rule.create({
    filename: "src/App.tsx",
    sourceCode: {
      getText: () => sourceText,
    },
    report: (descriptor) => {
      reports.push(descriptor);
    },
  }).Program();

  return reports;
}

describe("@nohardcoding/eslint-plugin-nohardtext", () => {
  it("reports hardcoded JSX text", () => {
    const reports = runRule([
      "export default function App() {",
      "  return <button>Save</button>;",
      "}",
    ].join("\n"));

    expect(reports).toHaveLength(1);
    expect(reports[0].messageId).toBe("hardcodedText");
    expect(reports[0].data.message).toBe(
      'NHT1001: Hardcoded JSX text found: "Save"'
    );
    expect(reports[0].loc.start.line).toBe(2);
  });

  it("does not report localized JSX text", () => {
    const reports = runRule([
      "export default function App() {",
      "  return <button>{t(\"actions.save\")}</button>;",
      "}",
    ].join("\n"));

    expect(reports).toEqual([]);
  });

  it("exposes a recommended flat config", () => {
    expect(plugin.configs.recommended).toMatchObject({
      rules: {
        "nohardtext/no-hardcoded-ui-strings": "error",
      },
    });
  });
});
