import { describe, expect, it } from "vitest";
import { detect } from "./index";

describe("accessibility rule categories", () => {
  it("uses accessibility category for aria-label and alt findings", () => {
    const result = detect({
      filePath: "src/App.tsx",
      sourceText: `export function App() {
  return (
    <>
      <button aria-label="Start button">Start</button>
      <img src="/logo.png" alt="Game logo" />
    </>
  );
}`
    });

    const ariaLabelFinding = result.findings.find((finding) => finding.ruleId === "NHT1004");
    const altFinding = result.findings.find((finding) => finding.ruleId === "NHT1005");

    expect(ariaLabelFinding?.category).toBe("accessibility");
    expect(altFinding?.category).toBe("accessibility");
  });
});
