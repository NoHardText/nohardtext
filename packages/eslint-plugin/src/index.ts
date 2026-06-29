import { detect } from "@nohardcoding/nohardtext-detect-engine";

interface SourceCodeLike {
  getText(): string;
}

interface ReportLocation {
  line: number;
  column: number;
}

interface ReportDescriptor {
  loc: {
    start: ReportLocation;
    end: ReportLocation;
  };
  messageId: "hardcodedText";
  data: {
    message: string;
  };
}

interface RuleContextLike {
  sourceCode?: SourceCodeLike;
  filename?: string;
  getSourceCode?: () => SourceCodeLike;
  getFilename?: () => string;
  report(descriptor: ReportDescriptor): void;
}

interface RuleListener {
  Program(): void;
}

interface RuleModuleLike {
  meta: {
    type: "problem";
    docs: {
      description: string;
      recommended: boolean;
    };
    messages: {
      hardcodedText: string;
    };
    schema: [];
  };
  create(context: RuleContextLike): RuleListener;
}

function getSourceCode(context: RuleContextLike): SourceCodeLike {
  const sourceCode = context.sourceCode ?? context.getSourceCode?.();

  if (!sourceCode) {
    throw new Error("NoHardText ESLint rule could not read source code.");
  }

  return sourceCode;
}

function getFilePath(context: RuleContextLike): string {
  return context.filename ?? context.getFilename?.() ?? "<unknown>";
}

function toEslintColumn(column: number): number {
  return Math.max(0, column - 1);
}

export const noHardcodedUiStringsRule: RuleModuleLike = {
  meta: {
    type: "problem",
    docs: {
      description: "Detect hardcoded user-facing UI strings with NoHardText.",
      recommended: true,
    },
    messages: {
      hardcodedText: "{{message}}",
    },
    schema: [],
  },
  create(context) {
    return {
      Program() {
        const sourceCode = getSourceCode(context);
        const filePath = getFilePath(context);
        const result = detect({
          filePath,
          sourceText: sourceCode.getText(),
        });

        for (const finding of result.findings) {
          context.report({
            loc: {
              start: {
                line: finding.location.startLine,
                column: toEslintColumn(finding.location.startColumn),
              },
              end: {
                line: finding.location.endLine,
                column: toEslintColumn(finding.location.endColumn),
              },
            },
            messageId: "hardcodedText",
            data: {
              message: `${finding.ruleId}: ${finding.message}`,
            },
          });
        }
      },
    };
  },
};

const rules = {
  "no-hardcoded-ui-strings": noHardcodedUiStringsRule,
};

const plugin = {
  meta: {
    name: "@nohardcoding/eslint-plugin-nohardtext",
    version: "0.1.0",
  },
  rules,
  configs: {} as Record<string, unknown>,
};

plugin.configs = {
  recommended: {
    plugins: {
      nohardtext: plugin,
    },
    rules: {
      "nohardtext/no-hardcoded-ui-strings": "error",
    },
  },
};

export { rules };

export default plugin;
