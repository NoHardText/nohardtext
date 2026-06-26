// src/index.ts
import { runRules } from "@nohardtext/rule-engine";

// src/rules/string-attribute.ts
import { collectJsxAttributeStringValues } from "@nohardtext/parser";
function detectStringAttribute(filePath, sourceText, config) {
  return collectJsxAttributeStringValues(sourceText, [config.attributeName]).map((node, index) => ({
    id: `${filePath}:${config.ruleId}:${node.startLine}:${node.startColumn}:${index}`,
    ruleId: config.ruleId,
    severity: "high",
    category: "localization",
    message: `${config.messagePrefix}: "${node.value}"`,
    explanation: config.explanation,
    location: {
      filePath,
      startLine: node.startLine,
      startColumn: node.startColumn,
      endLine: node.endLine,
      endColumn: node.endColumn
    },
    fixable: true,
    suggestions: [{ message: config.suggestion }]
  }));
}

// src/rules/alt.ts
function detectAltAttributeText(filePath, sourceText) {
  return detectStringAttribute(filePath, sourceText, {
    attributeName: "alt",
    ruleId: "NHT1005",
    messagePrefix: "Hardcoded alt attribute found",
    explanation: "User-facing image alt text should be moved to localization files.",
    suggestion: "Extract this alt text to a localization key."
  });
}

// src/rules/aria-label.ts
function detectAriaLabelText(filePath, sourceText) {
  return detectStringAttribute(filePath, sourceText, {
    attributeName: "aria-label",
    ruleId: "NHT1004",
    messagePrefix: "Hardcoded aria-label found",
    explanation: "User-facing accessibility labels should be moved to localization files.",
    suggestion: "Extract this aria-label to a localization key."
  });
}

// src/rules/jsx-text.ts
import { collectJsxTextNodes } from "@nohardtext/parser";
function detectJsxText(filePath, sourceText) {
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

// src/rules/placeholder.ts
function detectPlaceholderText(filePath, sourceText) {
  return detectStringAttribute(filePath, sourceText, {
    attributeName: "placeholder",
    ruleId: "NHT1002",
    messagePrefix: "Hardcoded placeholder found",
    explanation: "User-facing placeholder text should be moved to localization files.",
    suggestion: "Extract this placeholder to a localization key."
  });
}

// src/rules/title.ts
function detectTitleAttributeText(filePath, sourceText) {
  return detectStringAttribute(filePath, sourceText, {
    attributeName: "title",
    ruleId: "NHT1003",
    messagePrefix: "Hardcoded title attribute found",
    explanation: "User-facing title attributes should be moved to localization files.",
    suggestion: "Extract this title attribute to a localization key."
  });
}

// src/rules/registry.ts
var builtInRules = [
  {
    metadata: {
      id: "NHT1001",
      name: "JSX Text",
      category: "localization",
      severity: "high",
      description: "Detects hardcoded user-facing text inside JSX nodes.",
      fixable: true
    },
    detect: detectJsxText
  },
  {
    metadata: {
      id: "NHT1002",
      name: "Placeholder Attribute",
      category: "localization",
      severity: "high",
      description: "Detects hardcoded placeholder attribute values.",
      fixable: true
    },
    detect: detectPlaceholderText
  },
  {
    metadata: {
      id: "NHT1003",
      name: "Title Attribute",
      category: "localization",
      severity: "high",
      description: "Detects hardcoded title attribute values.",
      fixable: true
    },
    detect: detectTitleAttributeText
  },
  {
    metadata: {
      id: "NHT1004",
      name: "ARIA Label",
      category: "accessibility",
      severity: "high",
      description: "Detects hardcoded aria-label attribute values.",
      fixable: true
    },
    detect: detectAriaLabelText
  },
  {
    metadata: {
      id: "NHT1005",
      name: "Alt Attribute",
      category: "accessibility",
      severity: "high",
      description: "Detects hardcoded image alt attribute values.",
      fixable: true
    },
    detect: detectAltAttributeText
  }
];
var builtInRuleDetectors = builtInRules.map((rule) => rule.detect);
function getBuiltInRuleMetadata() {
  return builtInRules.map((rule) => rule.metadata);
}

// src/index.ts
function detect(input) {
  const ruleFindings = input.rules ? runRules(input.rules, {
    filePath: input.filePath,
    sourceText: input.sourceText
  }) : [];
  const builtInFindings = builtInRules.flatMap(
    (rule) => rule.detect(input.filePath, input.sourceText)
  );
  return {
    filePath: input.filePath,
    findings: [...ruleFindings, ...builtInFindings]
  };
}
export {
  detect,
  detectAltAttributeText,
  detectAriaLabelText,
  detectJsxText,
  detectPlaceholderText,
  detectTitleAttributeText,
  getBuiltInRuleMetadata
};
