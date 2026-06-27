const fs = require("node:fs");
const path = require("node:path");

const workspaceRoot = process.cwd();

const packagePaths = [
  "package.json",
  "packages/domain/package.json",
  "packages/parser/package.json",
  "packages/rule-engine/package.json",
  "packages/detect-engine/package.json",
  "packages/report-engine/package.json",
  "packages/cli/package.json"
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.join(workspaceRoot, filePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const rootPackage = readJson("package.json");
const expectedVersion = rootPackage.version;

assert(typeof expectedVersion === "string", "Root package.json must have a version.");

console.log("Expected version: " + expectedVersion);

for (const packagePath of packagePaths) {
  const packageJson = readJson(packagePath);

  assert(
    packageJson.version === expectedVersion,
    packagePath + " version mismatch. Expected " + expectedVersion + ", got " + packageJson.version + "."
  );

  console.log("OK " + packagePath + " => " + packageJson.version);
}

console.log("\nVersion check passed.");
