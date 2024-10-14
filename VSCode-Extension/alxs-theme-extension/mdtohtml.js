const fs = require("fs");
const path = require("path");
var grayMatter = require("gray-matter");
var hljs = require("highlight.js");
const vscode = require('vscode');

const md = require("markdown-it")({
    html: true,
    linkify: true,
    typographer: true,
    breaks: false,
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

// Configuration
let config = {
    components: {

        core: {
          rules: [
            'normalize',
            'block',
            'inline',
            'text_join'
          ]
        },
    
        block: {
          rules: [
            'blockquote',
            'code',
            'fence',
            'heading',
            'hr',
            'html_block',
            'lheading',
            'list',
            'reference',
            'paragraph'
          ]
        },
    
        inline: {
          rules: [
            'autolink',
            'backticks',
            'emphasis',
            'entity',
            // 'escape',
            'html_inline',
            'image',
            'link',
            'newline',
            'text'
          ],
          rules2: [
            'balance_pairs',
            'emphasis',
            'fragments_join'
          ]
        }
      }
}

md.configure(config);

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

    // § handle emphasize in math block
    // Save the default renderer for inline tokens, if they exist
    const defaultEmOpenRender = md.renderer.rules.em_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
    const defaultEmCloseRender = md.renderer.rules.em_close || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    // Helper function to check if a string starts with a substring
    function startsWith(str, prefix) {
        return str.slice(0, prefix.length) === prefix;
    }

    // Helper function to check if a string ends with a substring
    function endsWith(str, suffix) {
        return str.slice(-suffix.length) === suffix;
    }

    // Common logic for handling math blocks
    function handleMathBlock(tokens, idx, defaultRender, options, env, self) {
        const token = tokens[idx];

        if (startsWith(tokens[0].content, "$") && endsWith(tokens[tokens.length - 1].content, "$")) {
            return `${token.markup}`; // not .content for those special tokens
        }

        // Pass the token to the default renderer
        return defaultRender(tokens, idx, options, env, self);
    }

    // Override the renderer for em_open tokens
    md.renderer.rules.em_open = function (tokens, idx, options, env, self) {
        return handleMathBlock(tokens, idx, defaultEmOpenRender, options, env, self);
    };

    // Override the renderer for em_close tokens
    md.renderer.rules.em_close = function (tokens, idx, options, env, self) {
        return handleMathBlock(tokens, idx, defaultEmCloseRender, options, env, self);
    };

    // § Custom renderer for <pre><code> blocks

    const defaultHtmlBlockRender = md.renderer.rules.html_block || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    const getBlock = function (content, index) {
        // get the part of the content in between the index start and end
        return content.substring(index.start, index.end);
    }

    const getInnerPreCodeContent = function (preCodeBlock) {
        // get the content inside the <pre><code> block
        const preCodeBlockRegex = /<pre.*?>\s*<code.*?>(\s*<div.*?>)?([\s\S]*?)(<\/div>\s*)?<\/code>\s*<\/pre>/;
        const match = preCodeBlock.match(preCodeBlockRegex);
        return match[2];
    }

    const getPreCodeBlockIndexes = function (content) {
        // get the start and end indexes of every pre block inside the content and return an array of them
        const preBlockIndexes = [];
        const preBlockRegex = /<pre.*?>\s*<code.*?>[\s\S]*?<\/code>\s*<\/pre>/g;
        let match;
        while ((match = preBlockRegex.exec(content)) !== null) {
            preBlockIndexes.push({
                start: match.index,
                end: preBlockRegex.lastIndex
            });
        }
        return preBlockIndexes;
    }

    const handleInlineCode = function (tokens, idx, defaultRender, options, env, self) {
        const token = tokens[idx];
        const lang = token.info ? token.info.trim() : '';
        let content = token.content;

        let preCodeBlocksIndexes = getPreCodeBlockIndexes(content);

        if (preCodeBlocksIndexes.length > 0) { // if there is at least one pre block
            // replace every pre block by its highlited version
            preCodeBlocksIndexes.forEach((index) => {
                const block = getBlock(content, index);
                // console.log("-----")
                // console.log(block);
                const innerContent = getInnerPreCodeContent(block);
                // console.log("--- inner content ---");
                // console.log(innerContent);
                try {
                    let hljs_content = '<pre class="hljs"><code><div>' + hljs.highlightAuto(innerContent).value + '</div></code></pre>';
                    // todo for the following line, it is deprecated, we will take in charge the language later
                    // let hljs_content = '<pre class="hljs"><code><div>' + hljs.highlight('python', innerContent).value + '</div></code></pre>';
                    content = content.replace(block, hljs_content);
                } catch (error) {

                }
            });
            return content;
        }

        return defaultRender(tokens, idx, options, env, self);
    };

    md.renderer.rules.html_block = function (tokens, idx, options, env, self) {
        return handleInlineCode(tokens, idx, defaultHtmlBlockRender, options, env, self);
    };

    // § convert the img src of the markdown
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

    // § checkbox
    md.use(require("markdown-it-checkbox"));

    // § markdown-it-include
    md.use(require("markdown-it-include"), {
        root: path.dirname(mdPath),
        includeRe: /:\[.+\]\((.+\..+)\)/i,
    });

    console.log("before_container")

    

    

    // § toc
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
        vscode.window.showErrorMessage(error.message);
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
        vscode.window.showErrorMessage(`File ${mdPath} does not exist in the current directory`);
        throw new Error(`File ${mdPath} does not exist in the current directory`);
    }
    if (path.extname(mdPath) !== ".md") {
        console.log("File is not markdown");
        vscode.window.showErrorMessage("File is not markdown");
        throw new Error("File is not markdown");
    }
    const html = makeHtml(mdPath);
    const outputFilename = mdPath.replace(/\.md$/, "_tmp.html");
    fs.writeFileSync(outputFilename, html);
    return outputFilename;
}

module.exports = {
    mdToHtml
};