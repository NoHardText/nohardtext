import { HealthScore, ScanResult } from '@nohardtext/domain';

type ShipDecision = "yes" | "warning" | "no";
interface ReportSummary {
    totalFindings: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
    healthScore: HealthScore;
    shipDecision: ShipDecision;
    shipReason: string;
}
declare function createReportSummary(result: ScanResult): ReportSummary;

export { type ReportSummary, type ShipDecision, createReportSummary };
