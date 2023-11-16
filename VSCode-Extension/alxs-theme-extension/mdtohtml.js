const fs = require("fs");
const path = require("path");
var grayMatter = require("gray-matter");
var hljs = require("highlight.js");
const vscode = require('vscode');
var statusbarmessage = vscode.window.setStatusBarMessage('$(markdown) Converting (convertMarkdownToHtml) ...');


const md = require("markdown-it")({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: function (str, lang) {
        if (lang && lang.match(/\bmermaid\b/i)) {
            return `<div class="mermaid">${str}</div>`;
        }
        if (lang && hljs.getLanguage(lang)) {
            try {
                str = hljs.highlight(str, {language: lang, ignoreIllegals: true}).value;
            } catch (error) {
                str = md.utils.escapeHtml(str);
            }
        } else {
            str = md.utils.escapeHtml(str);
        }
        return '<pre class="hljs"><code><div>' + str + "</div></code></pre>";
    },
});

function readFile(filename, encode) {
    if (filename.length === 0) {
        return "";
    }
    if (!encode && encode !== null) {
        encode = "utf-8";
    }
    if (filename.indexOf("file://") === 0) {
        if (process.platform === "win32") {
            filename = filename
                .replace(/^file:\/\/\//, "")
                .replace(/^file:\/\//, "");
        } else {
            filename = filename.replace(/^file:\/\//, "");
        }
    }
    if (isExistsPath(filename)) {
        return fs.readFileSync(filename, encode);
    } else {
        return "";
    }
}

function isExistsPath(path) {
    if (path.length === 0) {
        return false;
    }
    try {
        fs.accessSync(path);
        return true;
    } catch (error) {
        console.warn(error.message);
        return false;
    }
}

/*
 * https://github.com/microsoft/vscode/blob/ca4ceeb87d4ff935c52a7af0671ed9779657e7bd/extensions/markdown-language-features/src/slugify.ts#L26
 */
function Slug(string) {
    try {
        var stg = encodeURI(
            string
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-") // Replace whitespace with -
                .replace(
                    /[\]\[\!\'\#\$\%\&\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\{\|\}\~\`。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝]/g,
                    ""
                ) // Remove known punctuators
                .replace(/^\-+/, "") // Remove leading -
                .replace(/\-+$/, "") // Remove trailing -
        );
        return stg;
    } catch (error) {
        console.log("there is an error")
        console.log(error.message);
    }
}

function includeCSS() {
    var csspath = path.join(__dirname, "styles", "markdown.css");
    var css = fs.readFileSync(csspath, "utf8");
    return `<style>${css}</style>`;

}

function requirements(mdPath) {

    console.log("requirements")

    try {

    // convert the img src of the markdown
    // var cheerio = require("cheerio");
    var defaultRender = md.renderer.rules.image;
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var href = token.attrs[token.attrIndex("src")][1];
        // console.log("original href: " + href);
        href = decodeURIComponent(href).replace(/("|')/g, "");
        // console.log("converted href: " + href);
        token.attrs[token.attrIndex("src")][1] = href;
        // pass token to default renderer.
        return defaultRender(tokens, idx, options, env, self);
    };

    // checkbox
    md.use(require("markdown-it-checkbox"));

    // markdown-it-include
    md.use(require("markdown-it-include"), {
        root: path.dirname(mdPath),
        includeRe: /:\[.+\]\((.+\..+)\)/i,
    });

    console.log("before_container")

    

    

    // toc
    // https://github.com/leff/markdown-it-named-headers
    var options_headers = {
        slugify: Slug,
    };
    md.use(require("markdown-it-named-headers"), options_headers);

    // emoji


    console.log("beforeemoji")

    

        var emojies_defs = require(path.join(__dirname, "data", "emoji.json"));
        try {
            var options = {
                defs: emojies_defs,
            };
        } catch (error) {
            console.log(error.message);
        }
        md.use(require("markdown-it-emoji"), options);
        md.renderer.rules.emoji = function (token, idx) {
            var emoji = token[idx].markup;
            var emojipath = path.join(
                __dirname,
                "node_modules",
                "emoji-images",
                "pngs",
                emoji + ".png"
            );
            var emojidata = readFile(emojipath, null).toString("base64");
            if (emojidata) {
                return (
                    '<img class="emoji" alt="' +
                    emoji +
                    '" src="data:image/png;base64,' +
                    emojidata +
                    '" />'
                );
            } else {
                return ":" + emoji + ":";
            }
        };

        // markdown-it-container
        // https://github.com/markdown-it/markdown-it-container
        md.use(require("markdown-it-container"), "", {
            validate: function (name) {
                return name.trim().length;
            },
            render: function (tokens, idx) {
                if (tokens[idx].info.trim() !== "") {
                    return `<div class="${tokens[idx].info.trim()}">\n`;
                } else {
                    return `</div>\n`;
                }
            },
        });
    } catch (error) {
        statusbarmessage.dispose();
        console.log(error.message);
    }
}

function makeHtml(mdPath) {
    console.log("beforerequs")
    requirements(mdPath);
    console.log("afterrequs")
    var mdFile = fs.readFileSync(mdPath, "utf8");
    grayMatter(mdFile);
    var html = md.render(mdFile);

    var title = path.basename(mdPath);

    var mermaid = `<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>`;

    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        ${mermaid}
        <title>${title}</title>
        ${includeCSS()}
    </head>
    <body>
        ${html}
    </body>
    </html>
    `;
    return htmlTemplate;
}

function mdToHtml(mdPath) {
    
    if (!fs.existsSync(mdPath)) {
        console.log(`File ${mdPath} does not exist in the current directory`);
        process.exit(1);
    }
    if (path.extname(mdPath) !== ".md") {
        console.log("File is not markdown");
        process.exit(1);
    }
    const html = makeHtml(mdPath);
    const outputFilename = mdPath.replace(/\.md$/, ".html");
    fs.writeFileSync(outputFilename, html);
    return outputFilename;
}

module.exports = {
    mdToHtml
};