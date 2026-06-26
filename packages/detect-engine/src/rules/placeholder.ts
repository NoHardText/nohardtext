import { detectStringAttribute } from "./string-attribute";

export function detectPlaceholderText(filePath: string, sourceText: string) {
  return detectStringAttribute(filePath, sourceText, {
    attributeName: "placeholder",
    ruleId: "NHT1002",
    messagePrefix: "Hardcoded placeholder found",
    explanation: "User-facing placeholder text should be moved to localization files.",
    suggestion: "Extract this placeholder to a localization key."
  });
}
