import { describe, expect, it } from "vitest";
import { detect } from "./index";

describe("attribute expression string values", () => {
  it("reports static strings inside JSX attribute expressions", () => {
    const result = detect({
      filePath: "src/App.tsx",
      sourceText: `
        export default function App() {
          return (
            <>
              <button title={"Start the game"}>Start</button>
              <input placeholder={"Search..."} />
              <img alt={\`Game logo\`} />
              <Button label={"Save"} />
            </>
          );
        }
      `
    });

    expect(result.findings.map((finding) => finding.message)).toEqual([
      'Hardcoded title attribute found: "Start the game"',
      'Hardcoded JSX text found: "Start"',
      'Hardcoded placeholder found: "Search..."',
      'Hardcoded alt attribute found: "Game logo"',
      'Hardcoded component prop "label" found: "Save"'
    ]);
  });
});