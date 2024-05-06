// example JavaScript file

// create link element for CSS file
var cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "style.css";
document.head.appendChild(cssLink);

// create link element for url CSS file
var cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "url.css";
document.head.appendChild(cssLink);

// setup for Katex
var katexSetup = document.createElement("script");
katexSetup.src = "../Global/javascript/setupForKatex.js";
katexSetup.defer = true;
document.head.appendChild(katexSetup);

// create script element for TOC
var tocScript = document.createElement("script");
tocScript.src = "javascript/toc.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for the date
var tocScript = document.createElement("script");
tocScript.src = "javascript/date.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for footnotes
var tocScript = document.createElement("script");
tocScript.src = "javascript/footnotes.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for custom blocks
var tocScript = document.createElement("script");
tocScript.src = "javascript/customblocks.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create a script for the color theme
var colorScript = document.createElement("script");
colorScript.src = "javascript/color.js";
colorScript.defer = true;
colorScript.onload = function() {
    document.color = new document.Color();
};
document.head.appendChild(colorScript);

// create a script for the font theme
var fontScript = document.createElement("script");
fontScript.src = "javascript/font.js";
fontScript.defer = true;
fontScript.onload = function() {
    document.font = new document.Font();
};
document.head.appendChild(fontScript);