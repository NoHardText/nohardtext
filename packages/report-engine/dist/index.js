// src/index.ts
function getGrade(score) {
  if (score >= 95) return "AAA";
  if (score >= 90) return "AA";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}
function createEmptyBreakdown() {
  return {
    totalFindings: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0
  };
}
function incrementBreakdown(breakdown, severity) {
  breakdown.totalFindings += 1;
  breakdown[severity] += 1;
}
function getRuleBreakdown(findings) {
  const breakdown = {};
  for (const finding of findings) {
    let ruleSummary = breakdown[finding.ruleId];
    if (!ruleSummary) {
      ruleSummary = createEmptyBreakdown();
      breakdown[finding.ruleId] = ruleSummary;
    }
    incrementBreakdown(ruleSummary, finding.severity);
  }
  return breakdown;
}
function getCategoryBreakdown(findings) {
  const breakdown = {};
  for (const finding of findings) {
    let categorySummary = breakdown[finding.category];
    if (!categorySummary) {
      categorySummary = createEmptyBreakdown();
      breakdown[finding.category] = categorySummary;
    }
    incrementBreakdown(categorySummary, finding.severity);
  }
  return breakdown;
}
function getSeverityRank(severity) {
  const order = [
    "info",
    "low",
    "medium",
    "high",
    "critical"
  ];
  return order.indexOf(severity);
}
function getTopIssues(findings, limit = 5) {
  const groups = /* @__PURE__ */ new Map();
  for (const finding of findings) {
    const key = [finding.ruleId, finding.category, finding.severity].join("|");
    const current = groups.get(key);
    if (current) {
      current.totalFindings += 1;
      continue;
    }
    groups.set(key, {
      ruleId: finding.ruleId,
      category: finding.category,
      severity: finding.severity,
      totalFindings: 1,
      exampleMessage: finding.message
    });
  }
  return [...groups.values()].sort((left, right) => {
    if (right.totalFindings !== left.totalFindings) {
      return right.totalFindings - left.totalFindings;
    }
    return getSeverityRank(right.severity) - getSeverityRank(left.severity);
  }).slice(0, limit);
}
function getShipDecision(summary) {
  if (summary.critical > 0) {
    return {
      shipDecision: "no",
      shipReason: `${summary.critical} critical localization findings found.`
    };
  }
  if (summary.high > 0) {
    return {
      shipDecision: "no",
      shipReason: `${summary.high} high-severity localization findings found.`
    };
  }
  if (summary.medium > 0 || summary.low > 0) {
    return {
      shipDecision: "warning",
      shipReason: `${summary.medium + summary.low} non-blocking localization findings found.`
    };
  }
  return {
    shipDecision: "yes",
    shipReason: "No blocking localization findings found."
  };
}
function createReportSummary(result) {
  const count = (severity) => result.findings.filter((finding) => finding.severity === severity).length;
  const critical = count("critical");
  const high = count("high");
  const medium = count("medium");
  const low = count("low");
  const info = count("info");
  const penalty = critical * 25 + high * 12 + medium * 6 + low * 2;
  const score = Math.max(0, 100 - penalty);
  const ship = getShipDecision({
    totalFindings: result.findings.length,
    critical,
    high,
    medium,
    low
  });
  return {
    totalFindings: result.findings.length,
    critical,
    high,
    medium,
    low,
    info,
    ruleBreakdown: getRuleBreakdown(result.findings),
    categoryBreakdown: getCategoryBreakdown(result.findings),
    topIssues: getTopIssues(result.findings),
    healthScore: {
      score,
      grade: getGrade(score)
    },
    shipDecision: ship.shipDecision,
    shipReason: ship.shipReason
  };
}
export {
  createReportSummary
};
