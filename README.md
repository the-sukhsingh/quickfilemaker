# Quick File Maker

A small VS Code extension that creates files from the clipboard. Copy text where the first line is the target file path (optionally prefixed with `//`) and the remaining lines are the file contents — then run the command to create the file inside the opened workspace.

## Features

- Create a new file anywhere in the active workspace by pasting a path+content from the clipboard.
- Automatically creates parent directories as needed.
- Writes files with UTF-8 encoding and normalizes line endings to LF.

## How it works (contract)

- Input: clipboard text where the first line is the file path (example: `//src/new/file.ts`) and the rest of the clipboard is the file content.
- Output: a file created at the path relative to the workspace root containing the clipboard content.
- Error modes: shows an error if no workspace is open or if the first line is empty.

## Installation

1. Install from the VS Code Marketplace (when published) or
2. Build & install locally:

	- Run the extension packaging/build scripts in this repository (see `package.json` scripts).
	- Install the generated `.vsix` with "Extensions: Install from VSIX..." in VS Code.

## Usage

1. Open a folder or workspace in VS Code (the extension requires a workspace root).
2. Prepare clipboard contents where:

	- First line: target path relative to the workspace root (you may prefix with `//` for readability). Example: `//src/utils/example.ts`
	- Remaining lines: the file content you want written into the file.

	Example clipboard contents:

	//src/hello/world.txt
	Hello World!
	This file was created from the clipboard.

3. Run the command: "Create File With Content" (command id: `extension.createFileWithContent`).

	- Use the Command Palette (Ctrl+Shift+P / Cmd+Shift+P) and type "Create File With Content".
	- After success, you will see a confirmation notification with the created file path.

## Command

- `extension.createFileWithContent` — Create a file from the current clipboard contents.

## Keyboard Shortcut

You can bind this command to a keyboard shortcut for faster access. Open your `keybindings.json` file (Preferences: Open Keyboard Shortcuts (JSON)) and add an entry like this:

```json
{
  "key": "ctrl+alt+n",
  "command": "extension.createFileWithContent"
}
```

This example binds the command to `Ctrl+Alt+N`. You can choose any key combination you prefer.

## Examples

- Create a TypeScript file:

  //src/lib/newModule.ts
  export const greeting = 'hello';

- Create a README:

  //docs/README.md
  # Docs
  This README was generated from the clipboard.

## Troubleshooting

- If you see "Please open a workspace or folder first." make sure a workspace is open — the extension resolves the path relative to the first workspace folder.
- If the file doesn't appear in Explorer immediately, try refreshing or reloading the window.

## Limitations

- The extension currently always writes files relative to the first workspace folder.
- No overwrite confirmation: if a path already exists it will be overwritten silently. Be careful when reusing existing paths.

## Development

- Command registration and behavior live in `src/extension.ts`.
- Key script entries are in `package.json` (compile, watch, package, test).

## Contributing

Contributions are welcome. Open issues or PRs for bugs, enhancements, or documentation fixes.

## License

See the repository license file (if present) or add a license you prefer.

