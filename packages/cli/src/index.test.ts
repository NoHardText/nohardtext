import { describe, expect, it } from "vitest";
import { getCliBanner } from "./index";

describe("@nohardtext/cli", () => {
  it("returns the CLI banner", () => {
    expect(getCliBanner()).toContain("NoHardText CLI");
    expect(getCliBanner()).toContain("Status: bootstrapped");
  });
});
