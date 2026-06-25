// src/index.ts
import { parse } from "@babel/parser";
function parseSource(source) {
  return parse(source, {
    sourceType: "module",
    plugins: [
      "typescript",
      "jsx"
    ]
  });
}
export {
  parseSource
};
