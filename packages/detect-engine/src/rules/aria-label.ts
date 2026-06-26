import { detectStringAttribute } from "./string-attribute";

export function detectAriaLabelText(filePath: string, sourceText: string) {
  return detectStringAttribute(filePath, sourceText, {
    attributeName: "aria-label",
    ruleId: "NHT1004",
    messagePrefix: "Hardcoded aria-label found",
    explanation: "User-facing accessibility labels should be moved to localization files.",
    suggestion: "Extract this aria-label to a localization key.",
    category: "accessibility"
  });
}
