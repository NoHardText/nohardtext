#!/usr/bin/env node

export function getCliBanner(): string {
  return [
    "NoHardText CLI",
    "Status: bootstrapped"
  ].join("\n");
}

export function runCli(): void {
  console.log(getCliBanner());
}

runCli();
