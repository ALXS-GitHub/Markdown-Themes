// example JavaScript file

// create link element for CSS file
var cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/Aesthetic/style.min.css";
document.head.appendChild(cssLink);

// create link element for url CSS file
var cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/Aesthetic/cdnurl.min.css";
document.head.appendChild(cssLink);

// create script element for MathJax
var mathJaxScript = document.createElement("script");
mathJaxScript.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";
document.head.appendChild(mathJaxScript);

mathJaxScript = document.createElement("script");
mathJaxScript.id = "MathJax-script";
mathJaxScript.async = true;
mathJaxScript.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
document.head.appendChild(mathJaxScript);

// create script element to setup MathJax configuration
var tocScript = document.createElement("script");
tocScript.src = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/Aesthetic/javascript/setupMathJax.min.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for TOC
var tocScript = document.createElement("script");
tocScript.src = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/Aesthetic/javascript/toc.min.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for footnotes
var tocScript = document.createElement("script");
tocScript.src = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/Aesthetic/javascript/footnotes.min.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for custom blocks
var tocScript = document.createElement("script");
tocScript.src = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/Aesthetic/javascript/customblocks.min.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create a script for the color theme
var colorScript = document.createElement("script");
colorScript.src = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/Aesthetic/javascript/color.min.js";
colorScript.defer = true;
colorScript.onload = function() {
    document.color = new document.Color();
};
document.head.appendChild(colorScript);

// create a script for the font theme
var fontScript = document.createElement("script");
fontScript.src = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/Aesthetic/javascript/font.min.js";
fontScript.defer = true;
fontScript.onload = function() {
    document.font = new document.Font();
};
document.head.appendChild(fontScript);