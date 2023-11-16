// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const { mdToHtml } = require("./mdtohtml.js");
const { htmlToPdf } = require("./htmltopdf.js");

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

    // µ Main theme commands
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

                editor
                    .edit((editBuilder) => {
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
                text = text.replace(/\n/g, "\n\t");

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
                            let lines = text.split("\n");
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

    // & Add custom boxes
    let boxesColor = [
        "red",
        "blue",
        "green",
        "orange",
        "yellow",
        "purple",
        "pink",
        "white",
    ];

    // @ usual boxes
    for (let color in boxesColor) {
        let disposableBox = vscode.commands.registerCommand(
            `alxs-theme-extension.boxes${boxesColor[color]}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let selection = editor.selection;
                let text = editor.document.getText(selection);
                text = text.replace(/\n/g, "\n\t");

                editor
                    .edit((editBuilder) => {
                        editBuilder.replace(
                            selection,
                            `<${boxesColor[color]}box>\n\t${text}\n</${boxesColor[color]}box>`
                        );
                    })
                    .then((success) => {
                        // Move cursor to the end of the text
                        if (success) {
                            let lines = text.split("\n");
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

        context.subscriptions.push(disposableBox);
    }

    // @ formula boxes
    for (let color in boxesColor) {
        let disposableBox = vscode.commands.registerCommand(
            `alxs-theme-extension.boxesformula${boxesColor[color]}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let selection = editor.selection;
                let text = editor.document.getText(selection);
                text = text.replace(/\n/g, "\n\t");

                editor
                    .edit((editBuilder) => {
                        editBuilder.replace(
                            selection,
                            `<${boxesColor[color]}formula>\n\t${text}\n</${boxesColor[color]}formula>`
                        );
                    })
                    .then((success) => {
                        // Move cursor to the end of the text
                        if (success) {
                            let lines = text.split("\n");
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

        context.subscriptions.push(disposableBox);
    }

    // & grids

    let sizes = ["2", "3"];
    for (let size of sizes) {
        let disposableGrid = vscode.commands.registerCommand(
            `alxs-theme-extension.grids${size}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let selection = editor.selection;
                let text = editor.document.getText(selection);
                text = text.replace(/\n/g, "\n\t");

                let content = `<div class="grid-container c${size}">\n`;
                content += `\t<div class="grid-item">\n\t\t${text}\n\t</div>\n`;
                let intSize = parseInt(size);
                console.log(size + intSize + '\n');
                for (let i = 1; i < intSize; i++) {
                    content += `\t<div class="grid-item">\n\t</div>\n`;
                }

                content += `</div>`;

                editor.edit((editBuilder) => {
                    editBuilder.replace(selection, content);
                });
            }
        );

        context.subscriptions.push(disposableGrid);
    }

    // & blank line

    let disposableBlank = vscode.commands.registerCommand(
        `alxs-theme-extension.blank`,
        function () {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            let position = editor.selection.active;
            editor.edit((editBuilder) => {
                editBuilder.insert(position, `<blank></blank>`);
            });
        }
    );

    context.subscriptions.push(disposableBlank);

    // & Alignements

    let alignements = ["left", "center", "right"];

    for (let alignement of alignements) {
        let disposableAlignement = vscode.commands.registerCommand(
            `alxs-theme-extension.alignements${alignement}`,
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
                            `<p class="${alignement}">${text}</p>`
                        );
                    })
                    .then((success) => {
                        // Move cursor to the end of the text
                        if (success) {
                            let position = editor.selection.start;
                            let newPosition = position.translate(
                                0,
                                12 + alignement.length + text.length
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

        context.subscriptions.push(disposableAlignement);
    }

    // & Text effects

    let effects = ["b", "i", "u", "s"];

    for (let effect of effects) {
        let disposableEffect = vscode.commands.registerCommand(
            `alxs-theme-extension.effects${effect}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let selection = editor.selection;
                let text = editor.document.getText(selection);

                editor
                    .edit((editBuilder) => {
                        editBuilder.replace(selection, `<${effect}>${text}</${effect}>`);
                    })
                    .then((success) => {
                        // Move cursor to the end of the text
                        if (success) {
                            let position = editor.selection.start;
                            let newPosition = position.translate(
                                0,
                                2 + effect.length + text.length
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

        context.subscriptions.push(disposableEffect);
    }

    // & Author component

    let disposableAuthor = vscode.commands.registerCommand(
        `alxs-theme-extension.author`,
        function () {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            let selection = editor.selection;
            let text = editor.document.getText(selection);

            editor
                .edit((editBuilder) => {
                    editBuilder.replace(selection, `<author>${text}</author>`);
                })
                .then((success) => {
                    // Move cursor to the end of the text
                    if (success) {
                        let position = editor.selection.start;
                        let newPosition = position.translate(
                            0,
                            8 + text.length
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

    context.subscriptions.push(disposableAuthor);

    // & Date component

    let disposableDate = vscode.commands.registerCommand(
        `alxs-theme-extension.date`,
        function () {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            let selection = editor.selection;
            let text = editor.document.getText(selection);

            editor
                .edit((editBuilder) => {
                    editBuilder.replace(selection, `<date>${text}</date>`);
                })
                .then((success) => {
                    // Move cursor to the end of the text
                    if (success) {
                        let position = editor.selection.start;
                        let newPosition = position.translate(
                            0,
                            6 + text.length
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

    context.subscriptions.push(disposableDate);

    // & Font size

    let sizesFont = ["6", "8", "10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "40", "44", "48", "52"];

    for (let size of sizesFont) {
        let disposableSize = vscode.commands.registerCommand(
            `alxs-theme-extension.fontsize${size}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let selection = editor.selection;
                let text = editor.document.getText(selection);

                editor
                    .edit((editBuilder) => {
                        editBuilder.replace(selection, `<span class="f${size}">${text}</span>`);
                    })
                    .then((success) => {
                        // Move cursor to the end of the text
                        if (success) {
                            let position = editor.selection.start;
                            let newPosition = position.translate(
                                0,
                                16 + size.length + text.length
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

        context.subscriptions.push(disposableSize);
    }


    // µ Md to pdf commands

    let disposableMdToPdf = vscode.commands.registerCommand(
        "alxs-theme-extension.mdToPdf",
        function () {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            let filePath = editor.document.uri.fsPath;

            const outputHtml = mdToHtml(filePath);
            console.log(outputHtml);
            htmlToPdf(outputHtml).then(() => {
                try {
                    fs.unlinkSync(outputHtml);
                } catch (error) {
                    console.log(error);
                }
            });
        }
    );

    context.subscriptions.push(disposableMdToPdf);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
