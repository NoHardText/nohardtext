import { describe, expect, it } from "vitest";
import { detect } from "./index";

describe("detect options", () => {
  it("passes additional component text props to built-in rules", () => {
    const result = detect({
      filePath: "src/App.tsx",
      sourceText: `
        export default function App() {
          return (
            <>
              <Toast message="Saved successfully" />
              <Badge text="New" />
              <Button label="Save" />
            </>
          );
        }
      `,
      options: {
        componentTextProps: ["message", "text"]
      }
    });

    expect(result.findings.map((finding) => finding.message)).toEqual([
      'Hardcoded component prop "message" found: "Saved successfully"',
      'Hardcoded component prop "text" found: "New"',
      'Hardcoded component prop "label" found: "Save"'
    ]);
  });
});