import type { Finding } from "@nohardtext/domain";
import { describe, expect, it } from "vitest";
import { createReportSummary } from "./index";

type FindingOverrides = Partial<Omit<Finding, "location">> & {
  location?: Partial<Finding["location"]>;
};

function createFinding(overrides: FindingOverrides = {}): Finding {
  const { location, ...rest } = overrides;

  return {
    id: "finding-1",
    ruleId: "NHT1001",
    severity: "high",
    category: "localization",
    message: "Hardcoded text found.",
    explanation: "Move user-facing text to localization files.",
    location: {
      filePath: "src/App.tsx",
      startLine: 1,
      startColumn: 1,
      endLine: 1,
      endColumn: 10,
      ...location
    },
    fixable: true,
    suggestions: [],
    ...rest
  };
}

describe("@nohardtext/report-engine", () => {
  it("creates a summary and health score", () => {
    const summary = createReportSummary({
      findings: [createFinding()]
    });

    expect(summary.totalFindings).toBe(1);
    expect(summary.high).toBe(1);
    expect(summary.healthScore.score).toBe(88);
    expect(summary.healthScore.grade).toBe("A");
    expect(summary.shipDecision).toBe("no");
    expect(summary.shipReason).toContain("high-severity");
  });

  it("creates rule and category breakdowns", () => {
    const summary = createReportSummary({
      findings: [
        createFinding({
          id: "finding-1",
          ruleId: "NHT1001",
          severity: "high",
          category: "localization"
        }),
        createFinding({
          id: "finding-2",
          ruleId: "NHT1001",
          severity: "medium",
          category: "localization"
        }),
        createFinding({
          id: "finding-3",
          ruleId: "NHT1005",
          severity: "high",
          category: "accessibility"
        })
      ]
    });

    expect(summary.ruleBreakdown).toEqual({
      NHT1001: {
        totalFindings: 2,
        critical: 0,
        high: 1,
        medium: 1,
        low: 0,
        info: 0
      },
      NHT1005: {
        totalFindings: 1,
        critical: 0,
        high: 1,
        medium: 0,
        low: 0,
        info: 0
      }
    });

    expect(summary.categoryBreakdown).toEqual({
      localization: {
        totalFindings: 2,
        critical: 0,
        high: 1,
        medium: 1,
        low: 0,
        info: 0
      },
      accessibility: {
        totalFindings: 1,
        critical: 0,
        high: 1,
        medium: 0,
        low: 0,
        info: 0
      }
    });
  });

  it("returns warning when only medium or low findings exist", () => {
    const summary = createReportSummary({
      findings: [
        createFinding({
          id: "finding-1",
          severity: "medium"
        }),
        createFinding({
          id: "finding-2",
          severity: "low"
        })
      ]
    });

    expect(summary.healthScore.score).toBe(92);
    expect(summary.healthScore.grade).toBe("AA");
    expect(summary.shipDecision).toBe("warning");
    expect(summary.shipReason).toContain("non-blocking");
  });

  it("allows shipping when no findings exist", () => {
    const summary = createReportSummary({
      findings: []
    });

    expect(summary.totalFindings).toBe(0);
    expect(summary.ruleBreakdown).toEqual({});
    expect(summary.categoryBreakdown).toEqual({});
    expect(summary.healthScore.score).toBe(100);
    expect(summary.healthScore.grade).toBe("AAA");
    expect(summary.shipDecision).toBe("yes");
  });
});
