import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { detect } from "./index";

function loadFixture(name: string): string {
  return readFileSync(
    join(__dirname, "__fixtures__", name, "component.tsx"),
    "utf8"
  );
}

describe("@nohardtext fixture suite", () => {
  it("react-dashboard fixture produces findings", () => {
    const result = detect({
      filePath: "component.tsx",
      sourceText: loadFixture("react-dashboard"),
    });

    expect(result.findings.length).toBeGreaterThan(0);
  });

  it("localized-dashboard fixture produces zero findings", () => {
    const result = detect({
      filePath: "component.tsx",
      sourceText: loadFixture("localized-dashboard"),
    });

    expect(result.findings).toEqual([]);
  });

  it("billing-page fixture detects user-facing text while ignoring technical props", () => {
    const result = detect({
      filePath: "component.tsx",
      sourceText: loadFixture("billing-page"),
    });

    const messages = result.findings.map((f) => f.message);

    expect(messages).toContain(
      'Hardcoded title attribute found: "Billing overview"'
    );

    expect(messages).toContain(
      'Hardcoded JSX text found: "Billing"'
    );

    expect(messages).toContain(
      'Hardcoded JSX text found: "Current Plan"'
    );

    expect(messages).toContain(
      'Hardcoded aria-label found: "Upgrade subscription"'
    );

    expect(messages).toContain(
      'Hardcoded JSX text found: "Upgrade"'
    );

    expect(
      messages.some((m) => m.includes("data-testid"))
    ).toBe(false);

    expect(
      messages.some((m) => m.includes("data-plan-id"))
    ).toBe(false);

    expect(
      messages.some((m) => m.includes("data-status"))
    ).toBe(false);
  });
});