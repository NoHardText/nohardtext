import { describe, expect, it } from "vitest";
import { collectJsxExpressionStringValues } from "./index";

describe("JSX expression string collection", () => {
  it("collects string literals inside JSX expression containers", () => {
    const nodes = collectJsxExpressionStringValues(`export default function App() {
  const count = 1;

  return (
    <>
      <button>{"Start Game"}</button>
      <span>{count}</span>
      <span>{t("hello")}</span>
    </>
  );
}`);

    expect(nodes).toHaveLength(1);
    expect(nodes[0]?.value).toBe("Start Game");
  });
});
