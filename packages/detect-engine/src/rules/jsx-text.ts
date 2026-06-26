import type { Finding } from "@nohardtext/domain";
import { collectJsxTextNodes } from "@nohardtext/parser";

export function detectJsxText(filePath: string, sourceText: string): Finding[] {
  return collectJsxTextNodes(sourceText).map((node, index) => ({
    id: `${filePath}:NHT1001:${node.startLine}:${node.startColumn}:${index}`,
    ruleId: "NHT1001",
    severity: "high",
    category: "localization",
    message: `Hardcoded JSX text found: "${node.text}"`,
    explanation: "User-facing JSX text should be moved to localization files.",
    location: {
      filePath,
      startLine: node.startLine,
      startColumn: node.startColumn,
      endLine: node.endLine,
      endColumn: node.endColumn
    },
    fixable: true,
    suggestions: [{ message: "Extract this text to a localization key." }]
  }));
}
