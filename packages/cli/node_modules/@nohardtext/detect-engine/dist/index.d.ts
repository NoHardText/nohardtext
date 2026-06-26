import * as _nohardtext_domain from '@nohardtext/domain';
import { Finding } from '@nohardtext/domain';
import { Rule } from '@nohardtext/rule-engine';

declare function detectAltAttributeText(filePath: string, sourceText: string): _nohardtext_domain.Finding[];

declare function detectAriaLabelText(filePath: string, sourceText: string): _nohardtext_domain.Finding[];

declare function detectJsxText(filePath: string, sourceText: string): Finding[];

declare function detectPlaceholderText(filePath: string, sourceText: string): _nohardtext_domain.Finding[];

declare function detectTitleAttributeText(filePath: string, sourceText: string): _nohardtext_domain.Finding[];

interface DetectInput {
    filePath: string;
    sourceText: string;
    rules?: Rule[];
}
interface DetectResult {
    filePath: string;
    findings: Finding[];
}
declare function detect(input: DetectInput): DetectResult;

export { type DetectInput, type DetectResult, detect, detectAltAttributeText, detectAriaLabelText, detectJsxText, detectPlaceholderText, detectTitleAttributeText };
