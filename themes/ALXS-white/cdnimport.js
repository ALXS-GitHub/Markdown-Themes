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

// setup for Katex
var katexSetup = document.createElement("script");
katexSetup.src = "https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/Global/javascript/setupForKatex.min.js";
katexSetup.defer = true;
document.head.appendChild(katexSetup);

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