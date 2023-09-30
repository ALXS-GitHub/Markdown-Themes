// example JavaScript file

// create link element for CSS file
var cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/ALXS-white/style.css";
document.head.appendChild(cssLink);

// create link element for url CSS file
var cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/ALXS-white/cdnurl.css";
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
tocScript.src = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/ALXS-white/javascript/setupMathJax.min.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for TOC
var tocScript = document.createElement("script");
tocScript.src = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/ALXS-white/javascript/toc.min.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for footnotes
var tocScript = document.createElement("script");
tocScript.src = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/ALXS-white/javascript/footnotes.min.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for custom blocks
var tocScript = document.createElement("script");
tocScript.src = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/ALXS-white/javascript/customblocks.min.js";
tocScript.defer = true;
document.head.appendChild(tocScript);