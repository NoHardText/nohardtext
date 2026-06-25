import type { Finding, HealthScore, ScanResult } from '@nohardtext/domain';

export interface ReportSummary {
  totalFindings: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
  healthScore: HealthScore;
}

export function createReportSummary(result: ScanResult): ReportSummary {
  const count = (severity: Finding['severity']) =>
    result.findings.filter((finding) => finding.severity === severity).length;

  const critical = count('critical');
  const high = count('high');
  const medium = count('medium');
  const low = count('low');
  const info = count('info');

  const penalty = critical * 25 + high * 12 + medium * 6 + low * 2;
  const score = Math.max(0, 100 - penalty);

  return {
    totalFindings: result.findings.length,
    critical,
    high,
    medium,
    low,
    info,
    healthScore: {
      score,
      grade: score >= 95 ? 'AAA' : score >= 90 ? 'AA' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : 'F'
    }
  };
}
