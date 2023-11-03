// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// & test command
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "alxs-theme-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('alxs-theme-extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from ALXS-Theme-Extension!');
	});

	context.subscriptions.push(disposable);

	// & md text color menu
	let colors = ['red', 'blue', 'green', 'orange', 'yellow', 'purple', 'pink', 'white'];
	for (let color of colors) {
		// @ text color
		let disposableColor = vscode.commands.registerCommand(`alxs-theme-extension.color${color}`, function () {
			let editor = vscode.window.activeTextEditor;
			if (!editor) {
				return; // No open text editor
			}
	
			let selection = editor.selection;
			let text = editor.document.getText(selection);
	
			editor.edit(editBuilder => {
				editBuilder.replace(selection, `<${color}>${text}</${color}>`);
			});
		});
	
		context.subscriptions.push(disposableColor);
	
		// @ highlight color
		let disposableHighlight = vscode.commands.registerCommand(`alxs-theme-extension.highlight${color}`, function () {
			let editor = vscode.window.activeTextEditor;
			if (!editor) {
				return; // No open text editor
			}
	
			let selection = editor.selection;
			let text = editor.document.getText(selection);
	
			editor.edit(editBuilder => {
				editBuilder.replace(selection, `<h${color}>${text}</h${color}>`);
			});
		});
	
		context.subscriptions.push(disposableHighlight);
	}
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
