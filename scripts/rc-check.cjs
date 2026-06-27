const { execSync } = require("node:child_process");

function run(command) {
  console.log("\n> " + command);
  execSync(command, {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: true
  });
}

run("pnpm release:version");
run("pnpm release:check");
run("pnpm release:pack");

run("node packages/cli/dist/index.js scan examples/react-basic/src");
run("node packages/cli/dist/index.js scan examples/react-clean/src");

console.log("\nRelease candidate check passed.");
