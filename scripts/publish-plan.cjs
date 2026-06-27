const fs = require("node:fs");
const path = require("node:path");

const packages = [
  {
    dir: "packages/domain",
    name: "@nohardcoding/nohardtext-domain"
  },
  {
    dir: "packages/parser",
    name: "@nohardcoding/nohardtext-parser"
  },
  {
    dir: "packages/rule-engine",
    name: "@nohardcoding/nohardtext-rule-engine"
  },
  {
    dir: "packages/report-engine",
    name: "@nohardcoding/nohardtext-report-engine"
  },
  {
    dir: "packages/detect-engine",
    name: "@nohardcoding/nohardtext-detect-engine"
  },
  {
    dir: "packages/cli",
    name: "@nohardcoding/nohardtext"
  }
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const rootPackage = readJson("package.json");
const version = rootPackage.version;
const isPrerelease = version.includes("-");
const npmTag = isPrerelease ? "rc" : "latest";

assert(version, "Root package.json must include a version.");

console.log("NoHardText publish plan");
console.log("");
console.log(`Version: ${version}`);
console.log(`npm dist-tag: ${npmTag}`);
console.log("");

if (isPrerelease) {
  console.log("Detected prerelease version. Packages should be published with --tag rc.");
} else {
  console.log("Detected stable version. Packages should be published with --tag latest.");
}

console.log("");
console.log("Package order:");
console.log("");

for (const packageInfo of packages) {
  const packageJsonPath = path.join(packageInfo.dir, "package.json");
  const packageJson = readJson(packageJsonPath);

  assert(
    packageJson.name === packageInfo.name,
    `Unexpected package name in ${packageJsonPath}. Expected ${packageInfo.name}, got ${packageJson.name}`
  );

  assert(
    packageJson.version === version,
    `Version mismatch in ${packageJsonPath}. Expected ${version}, got ${packageJson.version}`
  );

  assert(
    packageJson.private !== true,
    `${packageJson.name} is private and cannot be published.`
  );

  assert(
    packageJson.publishConfig?.access === "public",
    `${packageJson.name} must include publishConfig.access = "public".`
  );

  console.log(`- ${packageJson.name}@${packageJson.version}`);
}

console.log("");
console.log("Publish commands:");
console.log("");

for (const packageInfo of packages) {
  console.log(`cd ${packageInfo.dir}`);
  console.log(`npm publish --access public --tag ${npmTag}`);
  console.log("cd ../..");
  console.log("");
}

console.log("Verification commands:");
console.log("");
console.log('npm view "@nohardcoding/nohardtext" dist-tags');
console.log(`npm view "@nohardcoding/nohardtext@${version}" version`);
console.log("");
console.log("This script does not publish anything. It only prints the plan.");
