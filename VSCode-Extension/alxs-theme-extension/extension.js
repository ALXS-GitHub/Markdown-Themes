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
        "color",
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
        "color",
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
                console.log(size + intSize + "\n");
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
                        editBuilder.replace(
                            selection,
                            `<${effect}>${text}</${effect}>`
                        );
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

    let sizesFont = [
        "6",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "24",
        "28",
        "32",
        "36",
        "40",
        "44",
        "48",
        "52",
    ];

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
                        editBuilder.replace(
                            selection,
                            `<span class="f${size}">${text}</span>`
                        );
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

    // & image component

    let disposableImage = vscode.commands.registerCommand(
        `alxs-theme-extension.image`,
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
                        `<img src="${text}" style="width: auto; height: auto" class="" alt=""/>`
                    );
                })
                .then((success) => {
                    // Move cursor to the end of the text
                    if (success) {
                        let position = editor.selection.start;
                        let newPosition = position.translate(
                            0,
                            10 + text.length
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

    context.subscriptions.push(disposableImage);

    // µ Md to pdf commands

    let disposableMdToPdf = vscode.commands.registerCommand(
        "alxs-theme-extension.mdToPdf",
        function () {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            let filePath = editor.document.uri.fsPath;

            let outputHtml;
            try {
                outputHtml = mdToHtml(filePath);
            } catch (error) {
                console.log(error);
                return;
            }
            
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

    // µ TreeView

    // & Theme Provider

    const themeDataProvider = {
        getChildren: (element) => {
            if (!element) {
                return [
                    { label: "Theme", id: "theme", iconPath: vscode.Uri.file(context.asAbsolutePath("media/theme.png")) },
                    {
                        label: "Color",
                        id: "color",
                        iconPath: vscode.Uri.file(
                            context.asAbsolutePath("media/colors.png")
                        ),
                    },
                    { label: "Alignement", id: "alignement", iconPath: vscode.Uri.file(context.asAbsolutePath("media/alignement/alignement.png")) },
                    { label: "Components", id: "components", iconPath: vscode.Uri.file(context.asAbsolutePath("media/component.png")) },
                    { label: "Custom Boxes", id: "custom-boxes", iconPath: vscode.Uri.file(context.asAbsolutePath("media/boxes/boxsection.png")) },
                    { label: "Font Size", id: "font-size", iconPath: vscode.Uri.file(context.asAbsolutePath("media/font-size.png")) },
                    { label: "Text Effects", id: "text-effects", iconPath: vscode.Uri.file(context.asAbsolutePath("media/text-effect/text-effect.png")) },
                    { label: "Convert to PDF", command: "alxs-theme-extension.mdToPdf", iconPath: vscode.Uri.file(context.asAbsolutePath("media/convert-pdf.png"))}
                ];
            } else
                switch (element.id) {
                    case "theme":
                        return [
                            {
                                label: "Aesthetic",
                                command:
                                    "alxs-theme-extension.addThemeaesthetic",
                            },
                            {
                                label: "ALXS-white",
                                command:
                                    "alxs-theme-extension.addThemealxs-white",
                            },
                        ];
                    case "color":
                        return [
                            {
                                label: "Highlight Color",
                                id: "highlight-color",
                                iconPath: vscode.Uri.file(
                                    context.asAbsolutePath(
                                        "media/highlighter/highlightersection.png"
                                    )
                                ),
                            },
                            {
                                label: "Text Color",
                                id: "text-color",
                                iconPath: vscode.Uri.file(
                                    context.asAbsolutePath("media/T/Tsection.png")
                                ),
                            },
                        ];

                    case "text-color":
                        return [
                            {
                                label: "Color Blue",
                                command: "alxs-theme-extension.colorblue",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/T/Tblue.png")),
                            },
                            {
                                label: "Color Red",
                                command: "alxs-theme-extension.colorred",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/T/Tred.png")),
                            },
                            {
                                label: "Color Green",
                                command: "alxs-theme-extension.colorgreen",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/T/Tgreen.png")),
                            },
                            {
                                label: "Color Orange",
                                command: "alxs-theme-extension.colororange",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/T/Torange.png")),
                            },
                            {
                                label: "Color Yellow",
                                command: "alxs-theme-extension.coloryellow",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/T/Tyellow.png")),
                            },
                            {
                                label: "Color Purple",
                                command: "alxs-theme-extension.colorpurple",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/T/Tpurple.png")),
                            },
                            {
                                label: "Color Pink",
                                command: "alxs-theme-extension.colorpink",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/T/Tpink.png")),
                            },
                            {
                                label: "Color White",
                                command: "alxs-theme-extension.colorwhite",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/T/Twhite.png")),
                            },
                            {
                                label: "Color Theme Color",
                                command: "alxs-theme-extension.colorcolor",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/T/Tcolor.png")),
                            },
                        ];
                    case "highlight-color":
                        return [
                            {
                                label: "Highlight Blue",
                                command: "alxs-theme-extension.highlightblue",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/highlighter/highlighterblue.png")),
                            },
                            {
                                label: "Highlight Red",
                                command: "alxs-theme-extension.highlightred",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/highlighter/highlighterred.png")),
                            },
                            {
                                label: "Highlight Green",
                                command: "alxs-theme-extension.highlightgreen",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/highlighter/highlightergreen.png")),
                            },
                            {
                                label: "Highlight Orange",
                                command: "alxs-theme-extension.highlightorange",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/highlighter/highlighterorange.png")),
                            },
                            {
                                label: "Highlight Yellow",
                                command: "alxs-theme-extension.highlightyellow",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/highlighter/highlighteryellow.png")),
                            },
                            {
                                label: "Highlight Purple",
                                command: "alxs-theme-extension.highlightpurple",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/highlighter/highlighterpurple.png")),
                            },
                            {
                                label: "Highlight Pink",
                                command: "alxs-theme-extension.highlightpink",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/highlighter/highlighterpink.png")),
                            },
                            {
                                label: "Highlight White",
                                command: "alxs-theme-extension.highlightwhite",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/highlighter/highlighterwhite.png")),
                            },
                            {
                                label: "Highlight Theme Color",
                                command: "alxs-theme-extension.highlightcolor",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/highlighter/highlightercolor.png")),
                            },
                        ];
                    case "alignement":
                        return [
                            {
                                label: "Align Left",
                                command: "alxs-theme-extension.alignementsleft",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/alignement/left.png")),
                            },
                            {
                                label: "Align Center",
                                command:
                                    "alxs-theme-extension.alignementscenter",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/alignement/center.png")),
                            },
                            {
                                label: "Align Right",
                                command:
                                    "alxs-theme-extension.alignementsright",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/alignement/right.png")),
                            },
                        ];

                    case "components":
                        return [
                            {
                                label: "Blank Line",
                                command: "alxs-theme-extension.blank",
                            },
                            {
                                label: "Plan",
                                command: "alxs-theme-extension.componentsplan",
                            },
                            {
                                label: "Page Break",
                                command:
                                    "alxs-theme-extension.componentspagebreak",
                            },
                            {
                                label: "Footnote",
                                command: "alxs-theme-extension.componentsfnote",
                            },
                            {
                                label: "Author",
                                command: "alxs-theme-extension.author",
                            },
                            {
                                label: "Date",
                                command: "alxs-theme-extension.date",
                            },
                            {
                                label: "Image",
                                command: "alxs-theme-extension.image",
                            },
                            {
                                label: "Custom Blocks",
                                id: "custom-blocks",
                            },
                            {
                                label: "Grids",
                                id: "grids",
                            },
                        ];
                    case "custom-blocks":
                        return [
                            {
                                label: "Definition",
                                command:
                                    "alxs-theme-extension.componentscustomblockdefinition",
                            },
                            {
                                label: "Note",
                                command:
                                    "alxs-theme-extension.componentscustomblocknote",
                            },
                            {
                                label: "Warning",
                                command:
                                    "alxs-theme-extension.componentscustomblockwarning",
                            },
                            {
                                label: "Tip",
                                command:
                                    "alxs-theme-extension.componentscustomblocktip",
                            },
                            {
                                label: "Important",
                                command:
                                    "alxs-theme-extension.componentscustomblockimportant",
                            },
                            {
                                label: "Error",
                                command:
                                    "alxs-theme-extension.componentscustomblockerror",
                            },
                            {
                                label: "Sucess",
                                command:
                                    "alxs-theme-extension.componentscustomblocksucess",
                            },
                            {
                                label: "Abstract",
                                command:
                                    "alxs-theme-extension.componentscustomblockabstract",
                            },
                            {
                                label: "Example",
                                command:
                                    "alxs-theme-extension.componentscustomblockexample",
                            },
                            {
                                label: "Question",
                                command:
                                    "alxs-theme-extension.componentscustomblockquestion",
                            },
                            {
                                label: "Quote",
                                command:
                                    "alxs-theme-extension.componentscustomblockquote",
                            },
                            {
                                label: "Bug",
                                command:
                                    "alxs-theme-extension.componentscustomblockbug",
                            },
                        ];
                    case "grids":
                        return [
                            {
                                label: "Grid 2",
                                command: "alxs-theme-extension.grids2",
                            },
                            {
                                label: "Grid 3",
                                command: "alxs-theme-extension.grids3",
                            },
                        ];
                    case "custom-boxes":
                        return [
                            {
                                label: "Boxes",
                                id: "boxes",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/boxes/boxsection.png")),
                            },
                            {
                                label: "Formulas",
                                id: "formulas",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/formula/formulasection.png")),
                            },
                        ];
                    case "boxes":
                        return [
                            {
                                label: "Red Box",
                                command: "alxs-theme-extension.boxesred",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/boxes/boxred.png")),
                            },
                            {
                                label: "Blue Box",
                                command: "alxs-theme-extension.boxesblue",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/boxes/boxblue.png")),
                            },
                            {
                                label: "Green Box",
                                command: "alxs-theme-extension.boxesgreen",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/boxes/boxgreen.png")),
                            },
                            {
                                label: "Orange Box",
                                command: "alxs-theme-extension.boxesorange",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/boxes/boxorange.png")),
                            },
                            {
                                label: "Yellow Box",
                                command: "alxs-theme-extension.boxesyellow",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/boxes/boxyellow.png")),
                            },
                            {
                                label: "Purple Box",
                                command: "alxs-theme-extension.boxespurple",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/boxes/boxpurple.png")),
                            },
                            {
                                label: "Pink Box",
                                command: "alxs-theme-extension.boxespink",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/boxes/boxpink.png")),
                            },
                            {
                                label: "White Box",
                                command: "alxs-theme-extension.boxeswhite",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/boxes/boxwhite.png")),
                            },
                            {
                                label: "Theme Color Box",
                                command: "alxs-theme-extension.boxescolor",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/boxes/boxcolor.png")),
                            },
                        ];
                    case "formulas":
                        return [
                            {
                                label: "Red Formula",
                                command: "alxs-theme-extension.boxesformulared",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/formula/formulared.png")),
                            },
                            {
                                label: "Blue Formula",
                                command: "alxs-theme-extension.boxesformulablue",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/formula/formulablue.png")),
                            },
                            {
                                label: "Green Formula",
                                command:
                                    "alxs-theme-extension.boxesformulagreen",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/formula/formulagreen.png")),
                            },
                            {
                                label: "Orange Formula",
                                command:
                                    "alxs-theme-extension.boxesformulaorange",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/formula/formulaorange.png")),
                            },
                            {
                                label: "Yellow Formula",
                                command:
                                    "alxs-theme-extension.boxesformulayellow",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/formula/formulayellow.png")),
                            },
                            {
                                label: "Purple Formula",
                                command:
                                    "alxs-theme-extension.boxesformulapurple",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/formula/formulapurple.png")),
                            },
                            {
                                label: "Pink Formula",
                                command: "alxs-theme-extension.boxesformulapink",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/formula/formulapink.png")),
                            },
                            {
                                label: "White Formula",
                                command:
                                    "alxs-theme-extension.boxesformulawhite",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/formula/formulawhite.png")),
                            },
                            {
                                label: "Theme Color Formula",
                                command:
                                    "alxs-theme-extension.boxesformulacolor",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/formula/formulacolor.png")),
                            },
                        ];
                    case "font-size":
                        return [
                            {
                                label: "Size 6",
                                command: "alxs-theme-extension.fontsize6",
                            },
                            {
                                label: "Size 8",
                                command: "alxs-theme-extension.fontsize8",
                            },
                            {
                                label: "Size 10",
                                command: "alxs-theme-extension.fontsize10",
                            },
                            {
                                label: "Size 12",
                                command: "alxs-theme-extension.fontsize12",
                            },
                            {
                                label: "Size 14",
                                command: "alxs-theme-extension.fontsize14",
                            },
                            {
                                label: "Size 16",
                                command: "alxs-theme-extension.fontsize16",
                            },
                            {
                                label: "Size 18",
                                command: "alxs-theme-extension.fontsize18",
                            },
                            {
                                label: "Size 20",
                                command: "alxs-theme-extension.fontsize20",
                            },
                            {
                                label: "Size 24",
                                command: "alxs-theme-extension.fontsize24",
                            },
                            {
                                label: "Size 28",
                                command: "alxs-theme-extension.fontsize28",
                            },
                            {
                                label: "Size 32",
                                command: "alxs-theme-extension.fontsize32",
                            },
                            {
                                label: "Size 36",
                                command: "alxs-theme-extension.fontsize36",
                            },
                            {
                                label: "Size 40",
                                command: "alxs-theme-extension.fontsize40",
                            },
                            {
                                label: "Size 44",
                                command: "alxs-theme-extension.fontsize44",
                            },
                            {
                                label: "Size 48",
                                command: "alxs-theme-extension.fontsize48",
                            },
                            {
                                label: "Size 52",
                                command: "alxs-theme-extension.fontsize52",
                            },
                        ];
                    case "text-effects":
                        return [
                            {
                                label: "Bold",
                                command: "alxs-theme-extension.effectsb",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/text-effect/bold.png")),
                            },
                            {
                                label: "Italic",
                                command: "alxs-theme-extension.effectsi",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/text-effect/italic.png")),
                            },
                            {
                                label: "Underline",
                                command: "alxs-theme-extension.effectsu",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/text-effect/underline.png")),
                            },
                            {
                                label: "Strike",
                                command: "alxs-theme-extension.effectss",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("media/text-effect/strikethrough.png")),
                            },
                        ];
                }
        },
        getTreeItem: (item) => {
            return {
                label: item.label,
                command: item.command
                    ? {
                          command: item.command,
                          title: item.label,
                      }
                    : undefined,
                collapsibleState: item.command
                    ? vscode.TreeItemCollapsibleState.None
                    : vscode.TreeItemCollapsibleState.Collapsed,
                iconPath: item.iconPath,
            };
        },
    };

    vscode.window.createTreeView("alxs-theme-extension.themeView", {
        treeDataProvider: themeDataProvider,
    });
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
