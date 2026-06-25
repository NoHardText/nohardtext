// src/index.ts
import { runRules } from "@nohardtext/rule-engine";
function detect(input) {
  return {
    filePath: input.filePath,
    findings: runRules(input.rules, {
      filePath: input.filePath,
      sourceText: input.sourceText
    })
  };
}
export {
  detect
};
