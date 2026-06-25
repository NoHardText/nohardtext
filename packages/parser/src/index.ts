import { parse } from "@babel/parser";

export function parseSource(source: string) {
    return parse(source, {
        sourceType: "module",
        plugins: [
            "typescript",
            "jsx"
        ]
    });
}