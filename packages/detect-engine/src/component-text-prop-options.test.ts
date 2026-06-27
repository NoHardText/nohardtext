import { describe, expect, it } from "vitest";
import { detectCustomComponentPropText } from "./index";

describe("component text prop options", () => {
  it("supports additional component text prop names", () => {
    const findings = detectCustomComponentPropText(
      "src/App.tsx",
      `
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
      {
        propNames: ["message", "text"]
      }
    );

    expect(findings.map((finding) => finding.message)).toEqual([
      'Hardcoded component prop "label" found: "Save"',
      'Hardcoded component prop "message" found: "Saved successfully"',
      'Hardcoded component prop "text" found: "New"'
    ]);
  });
});