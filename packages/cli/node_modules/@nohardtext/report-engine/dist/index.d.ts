import { HealthScore, ScanResult } from '@nohardtext/domain';

interface ReportSummary {
    totalFindings: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
    healthScore: HealthScore;
}
declare function createReportSummary(result: ScanResult): ReportSummary;

export { type ReportSummary, createReportSummary };
