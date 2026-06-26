import { describe, expect, it } from "vitest";
import { detect } from "./index";

describe("localization calls", () => {
  it("does not report strings passed to common localization functions", () => {
    const result = detect({
      filePath: "src/App.tsx",
      sourceText: `
        export default function App() {
          return (
            <>
              <h1>{t("home.title")}</h1>
              <p>{i18n.t("home.subtitle")}</p>
              <button>{translate("actions.save")}</button>
              <span>Save</span>
            </>
          );
        }
      `
    });

    expect(result.findings.map((finding) => finding.message)).toEqual([
      'Hardcoded JSX text found: "Save"'
    ]);
  });
});