#!/usr/bin/env node

// src/index.ts
function getCliBanner() {
  return [
    "NoHardText CLI",
    "Status: bootstrapped"
  ].join("\n");
}
function runCli() {
  console.log(getCliBanner());
}
runCli();
export {
  getCliBanner,
  runCli
};
