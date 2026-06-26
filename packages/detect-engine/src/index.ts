import type { Finding } from "@nohardtext/domain";
import { runRules, type Rule } from "@nohardtext/rule-engine";
import { detectAltAttributeText } from "./rules/alt";
import { detectAriaLabelText } from "./rules/aria-label";
import { detectJsxText } from "./rules/jsx-text";
import { detectPlaceholderText } from "./rules/placeholder";
import { detectTitleAttributeText } from "./rules/title";

export { detectAltAttributeText } from "./rules/alt";
export { detectAriaLabelText } from "./rules/aria-label";
export { detectJsxText } from "./rules/jsx-text";
export { detectPlaceholderText } from "./rules/placeholder";
export { detectTitleAttributeText } from "./rules/title";

export interface DetectInput {
  filePath: string;
  sourceText: string;
  rules?: Rule[];
}

export interface DetectResult {
  filePath: string;
  findings: Finding[];
}

export function detect(input: DetectInput): DetectResult {
  const ruleFindings = input.rules
    ? runRules(input.rules, {
        filePath: input.filePath,
        sourceText: input.sourceText
      })
    : [];

  return {
    filePath: input.filePath,
    findings: [
      ...ruleFindings,
      ...detectJsxText(input.filePath, input.sourceText),
      ...detectPlaceholderText(input.filePath, input.sourceText),
      ...detectTitleAttributeText(input.filePath, input.sourceText),
      ...detectAriaLabelText(input.filePath, input.sourceText),
      ...detectAltAttributeText(input.filePath, input.sourceText)
    ]
  };
}
