import { describe, expect, it } from "vitest";
import { collectJsxAttributeStringValues } from "./index";

describe("JSX attribute expression string values", () => {
  it("collects string values inside JSX attribute expressions", () => {
    const nodes = collectJsxAttributeStringValues(
      `
        export default function App() {
          return (
            <>
              <Button label={"Save"} />
              <button title={"Start the game"} />
              <img alt={\`Game logo\`} />
            </>
          );
        }
      `,
      ["label", "title", "alt"]
    );

    expect(nodes.map((node) => node.value)).toEqual([
      "Save",
      "Start the game",
      "Game logo"
    ]);
  });
});