import { describe, expect, it } from "vitest";
import { detect } from "./index";

describe("technical props", () => {
  it("ignores common technical props and reports only user-facing component text props", () => {
    const result = detect({
      filePath: "src/App.tsx",
      sourceText: `
        export default function App() {
          return (
            <>
              <Button
                label="Save"
                data-testid="save-button"
                className="primary-button"
                id="save-button"
                variant="danger"
                size="large"
                href="/settings"
              />
            </>
          );
        }
      `
    });

    expect(result.findings.map((finding) => finding.message)).toEqual([
      'Hardcoded component prop "label" found: "Save"'
    ]);
  });
});