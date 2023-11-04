// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // & test command
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(
        'Congratulations, your extension "alxs-theme-extension" is now active!'
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        "alxs-theme-extension.helloWorld",
        function () {
            // The code you place here will be executed every time your command is executed

            // Display a message box to the user
            vscode.window.showInformationMessage(
                "Hello World from ALXS-Theme-Extension!"
            );
        }
    );

    context.subscriptions.push(disposable);

    // & md text color menu
    let colors = [
        "red",
        "blue",
        "green",
        "orange",
        "yellow",
        "purple",
        "pink",
        "white",
    ];
    for (let color of colors) {
        // @ text color
        let disposableColor = vscode.commands.registerCommand(
            `alxs-theme-extension.color${color}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let selection = editor.selection;
                let text = editor.document.getText(selection);

                editor.edit((editBuilder) => {
                    editBuilder.replace(
                        selection,
                        `<${color}>${text}</${color}>`
                    );
                })
				.then((success) => {
					// Move cursor to the end of the text
					if (success) {
						let position = editor.selection.start;
						let newPosition = position.translate(
							0,
							2 + color.length + text.length
						); // 3 is the length of "<h>"
						let newSelection = new vscode.Selection(
							newPosition,
							newPosition
						);
						editor.selection = newSelection;
					}
				});
            }
        );

        context.subscriptions.push(disposableColor);

        // @ highlight color
        let disposableHighlight = vscode.commands.registerCommand(
            `alxs-theme-extension.highlight${color}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let selection = editor.selection;
                let text = editor.document.getText(selection);

                editor
                    .edit((editBuilder) => {
                        editBuilder.replace(
                            selection,
                            `<h${color}>${text}</h${color}>`
                        );
                    })
                    .then((success) => {
                        // Move cursor to the end of the text
                        if (success) {
                            let position = editor.selection.start;
                            let newPosition = position.translate(
                                0,
                                3 + color.length + text.length
                            ); // 3 is the length of "<h>"
                            let newSelection = new vscode.Selection(
                                newPosition,
                                newPosition
                            );
                            editor.selection = newSelection;
                        }
                    });
            }
        );

        context.subscriptions.push(disposableHighlight);
    }

    // & Add theme
    let themes = ["Aesthetic", "ALXS-white"];
    let customisableThemes = ["Aesthetic"];

    for (let theme of themes) {
        let disposableTheme = vscode.commands.registerCommand(
            `alxs-theme-extension.addTheme${theme.toLowerCase()}`,
            function () {
                let content = `<script src=\"https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/${theme}/cdnimport.js\"></script>\n`;

                if (customisableThemes.includes(theme)) {
                    content +=
                        "<script defer>\n" +
                        '\twindow.addEventListener("load", function() {\n' +
                        '\tdocument.color.setColor("blue");\n' +
                        '\tdocument.font.setFont("arial");\n' +
                        "});\n" +
                        "</script>\n";
                }

                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let position = editor.selection.active;
                editor.edit((editBuilder) => {
                    editBuilder.insert(position, content);
                });
            }
        );

        context.subscriptions.push(disposableTheme);
    }

    // & Components
    // @ usual components
    let components = ["plan", "pagebreak"];

    for (let component of components) {
        let disposableComponent = vscode.commands.registerCommand(
            `alxs-theme-extension.components${component}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let position = editor.selection.active;
                editor.edit((editBuilder) => {
                    editBuilder.insert(
                        position,
                        `<${component}></${component}>`
                    );
                });
            }
        );

        context.subscriptions.push(disposableComponent);
    }

    // @ footnote component
    let disposableFootnote = vscode.commands.registerCommand(
        `alxs-theme-extension.componentsfnote`,
        function () {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            let selection = editor.selection;
            let text = editor.document.getText(selection);

            editor
                .edit((editBuilder) => {
                    editBuilder.replace(
                        selection,
                        `<fnote>${text} || </fnote>`
                    );
                })
                .then((success) => {
                    // Move cursor to the end of the text
                    if (success) {
                        let position = editor.selection.start;
                        let newPosition = position.translate(
                            0,
                            7 + text.length
                        ); // 7 is the length of "<fnote>"
                        let newSelection = new vscode.Selection(
                            newPosition,
                            newPosition
                        );
                        editor.selection = newSelection;
                    }
                });
        }
    );

    context.subscriptions.push(disposableFootnote);

    // @ custom blocks components
    let customBlocks = [
        "definition",
        "note",
        "warning",
        "tip",
        "important",
        "error",
        "sucess",
        "abstract",
        "example",
        "question",
        "quote",
        "bug",
    ];
    for (let block of customBlocks) {
        let disposableBlock = vscode.commands.registerCommand(
            `alxs-theme-extension.componentscustomblock${block}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let selection = editor.selection;
                let text = editor.document.getText(selection);
				text = text.replace(/\n/g, '\n\t');

                editor
                    .edit((editBuilder) => {
                        editBuilder.replace(
                            selection,
                            `<div class=\"${block}\">\n\t${text}\n</div>`
                        );
                    })
                    .then((success) => {
                        // Move cursor to the end of the text
                        if (success) {
							let lines = text.split('\n');
        					let lastLine = lines[lines.length - 1];
                            let position = editor.selection.start;
                            let newPosition = position.translate(
                                lines.length,
                                lastLine.length + 1
                            ); // 12 is the length of "<div class=\"\">"
                            let newSelection = new vscode.Selection(
                                newPosition,
                                newPosition
                            );
                            editor.selection = newSelection;
                        }
                    });
            }
        );

        context.subscriptions.push(disposableBlock);
    }
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
