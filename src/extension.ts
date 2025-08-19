import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.createFileWithContent', async () => {
		// Read clipboard text
		const text = await vscode.env.clipboard.readText();


		// Split into lines
		const [firstLine, ...rest] = text.split(/\r?\n/);

		// Extract file path (remove leading //)
		const filePath = firstLine.replace(/^(\s*\/\/|\s*#)/, "").trim();
		const content = rest.join("\n");

		if (!filePath) {
			vscode.window.showErrorMessage("No file path found in the first line.");
			return;
		}

		// Resolve workspace root
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			vscode.window.showErrorMessage("Please open a workspace or folder first.");
			return;
		}
		const rootPath = workspaceFolders[0].uri.fsPath;

		// Absolute file path
		const absPath = path.join(rootPath, filePath);

		// Ensure directories exist
		fs.mkdirSync(path.dirname(absPath), { recursive: true });

		// Write file with UTF-8 + LF line endings
		fs.writeFileSync(absPath, content.replace(/\r\n/g, "\n"), "utf8");

		vscode.window.showInformationMessage(`✅ File created: ${filePath}`);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
