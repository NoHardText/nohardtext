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
