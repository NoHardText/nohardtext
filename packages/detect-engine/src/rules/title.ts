import { detectStringAttribute } from "./string-attribute";

export function detectTitleAttributeText(filePath: string, sourceText: string) {
  return detectStringAttribute(filePath, sourceText, {
    attributeName: "title",
    ruleId: "NHT1003",
    messagePrefix: "Hardcoded title attribute found",
    explanation: "User-facing title attributes should be moved to localization files.",
    suggestion: "Extract this title attribute to a localization key."
  });
}
