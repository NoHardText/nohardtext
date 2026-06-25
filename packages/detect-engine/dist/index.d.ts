import { Finding } from '@nohardtext/domain';
import { Rule } from '@nohardtext/rule-engine';

interface DetectInput {
    filePath: string;
    sourceText: string;
    rules: Rule[];
}
interface DetectResult {
    filePath: string;
    findings: Finding[];
}
declare function detect(input: DetectInput): DetectResult;

export { type DetectInput, type DetectResult, detect };
