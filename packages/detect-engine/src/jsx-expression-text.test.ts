import { describe, expect, it } from "vitest";
import { detect } from "./index";

describe("JSX expression text detection", () => {
  it("detects hardcoded strings inside JSX expressions", () => {
    const result = detect({
      filePath: "src/App.tsx",
      sourceText: `export default function App() {
  return <button>{"Start Game"}</button>;
}`
    });

    expect(result.findings).toHaveLength(1);
    expect(result.findings[0]?.ruleId).toBe("NHT1001");
    expect(result.findings[0]?.message).toContain("Start Game");
  });
});
