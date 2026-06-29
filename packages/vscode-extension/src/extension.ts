import { execFile } from "node:child_process";
import { promisify } from "node:util";
import * as vscode from "vscode";

const execFileAsync = promisify(execFile);

let outputChannel: vscode.OutputChannel | undefined;

function getOutputChannel(): vscode.OutputChannel {
  outputChannel ??= vscode.window.createOutputChannel("NoHardText");
  return outputChannel;
}

function getWorkspaceFolder(): vscode.WorkspaceFolder | undefined {
  return vscode.workspace.workspaceFolders?.[0];
}

function getNpxCommand(): string {
  return process.platform === "win32" ? "npx.cmd" : "npx";
}

function getExtensionConfiguration() {
  const config = vscode.workspace.getConfiguration("nohardtext");

  return {
    scanPath: config.get<string>("scanPath", "src"),
    packageVersion: config.get<string>("packageVersion", "latest"),
  };
}

async function runNoHardTextScan(): Promise<void> {
  const output = getOutputChannel();
  const workspaceFolder = getWorkspaceFolder();

  if (!workspaceFolder) {
    vscode.window.showWarningMessage("NoHardText: Open a workspace before scanning.");
    return;
  }

  const { scanPath, packageVersion } = getExtensionConfiguration();
  const packageSpec = `@nohardcoding/nohardtext@${packageVersion}`;
  const command = getNpxCommand();
  const args = ["-y", "--package", packageSpec, "nohardtext", "scan", scanPath];

  output.clear();
  output.show(true);
  output.appendLine("NoHardText");
  output.appendLine(`Workspace: ${workspaceFolder.uri.fsPath}`);
  output.appendLine(`Scan path: ${scanPath}`);
  output.appendLine(`Package: ${packageSpec}`);
  output.appendLine("");
  output.appendLine(`$ ${command} ${args.join(" ")}`);
  output.appendLine("");

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "NoHardText: scanning workspace",
      cancellable: false,
    },
    async () => {
      try {
        const result = await execFileAsync(command, args, {
          cwd: workspaceFolder.uri.fsPath,
          maxBuffer: 1024 * 1024 * 10,
          windowsHide: true,
        });

        if (result.stdout) {
          output.append(result.stdout);
        }

        if (result.stderr) {
          output.append(result.stderr);
        }

        vscode.window.showInformationMessage("NoHardText scan completed.");
      } catch (error) {
        const failed = error as {
          stdout?: string;
          stderr?: string;
          message?: string;
          code?: number;
        };

        if (failed.stdout) {
          output.append(failed.stdout);
        }

        if (failed.stderr) {
          output.append(failed.stderr);
        }

        output.appendLine("");
        output.appendLine(`NoHardText exited with code: ${failed.code ?? "unknown"}`);

        vscode.window.showErrorMessage(
          "NoHardText scan completed with findings or errors. Check the NoHardText output panel."
        );
      }
    }
  );
}

export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand(
    "nohardtext.scanWorkspace",
    runNoHardTextScan
  );

  context.subscriptions.push(disposable);
}

export function deactivate(): void {
  outputChannel?.dispose();
  outputChannel = undefined;
}
