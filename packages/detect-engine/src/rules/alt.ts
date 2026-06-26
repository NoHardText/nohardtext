import { detectStringAttribute } from "./string-attribute";

export function detectAltAttributeText(filePath: string, sourceText: string) {
  return detectStringAttribute(filePath, sourceText, {
    attributeName: "alt",
    ruleId: "NHT1005",
    messagePrefix: "Hardcoded alt attribute found",
    explanation: "User-facing image alt text should be moved to localization files.",
    suggestion: "Extract this alt text to a localization key.",
    category: "accessibility"
  });
}
