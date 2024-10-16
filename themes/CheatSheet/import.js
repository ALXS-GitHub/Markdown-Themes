// example JavaScript file

function getScriptPath() {
    var currentScript = document.currentScript.src;
    var path = currentScript.split('?')[0];
    var mydir = path.split('/').slice(0, -1).join('/') + '/';
    return mydir;
}

// get the base path for the theme
var basePath = getScriptPath();


// create link element for CSS file
var cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = basePath + "style.css";
document.head.appendChild(cssLink);

// create link element for url CSS file
var cssLink = document.createElement("link");
cssLink.rel = basePath + "stylesheet";
cssLink.href = basePath + "url.css";
document.head.appendChild(cssLink);

// setup for Katex
var katexSetup = document.createElement("script");
katexSetup.src = basePath + "../Global/javascript/setupForKatex.js";
katexSetup.defer = true;
document.head.appendChild(katexSetup);

// create script element for TOC
var tocScript = document.createElement("script");
tocScript.src = basePath + "javascript/toc.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for the date
var tocScript = document.createElement("script");
tocScript.src = basePath + "javascript/date.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for footnotes
var tocScript = document.createElement("script");
tocScript.src = basePath + "javascript/footnotes.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create script element for custom blocks
var tocScript = document.createElement("script");
tocScript.src = basePath + "javascript/customblocks.js";
tocScript.defer = true;
document.head.appendChild(tocScript);

// create a script for the color theme
var colorScript = document.createElement("script");
colorScript.src = basePath + "javascript/color.js";
colorScript.defer = true;
colorScript.onload = function() {
    document.color = new document.Color();
};
document.head.appendChild(colorScript);

// create a script for the font theme
var fontScript = document.createElement("script");
fontScript.src = basePath + "javascript/font.js";
fontScript.defer = true;
fontScript.onload = function() {
    document.font = new document.Font();
};
document.head.appendChild(fontScript);

// create script for the highlight.js library
var highlightCssLink = document.createElement("link");
highlightCssLink.rel = "stylesheet";
highlightCssLink.id = "highlightCssLink";
highlightCssLink.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/tokyo-night-dark.min.css";
document.head.appendChild(highlightCssLink);

var highlightScript = document.createElement("script");
highlightScript.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
highlightScript.defer = true;
document.head.appendChild(highlightScript);

highlightScript = document.createElement("script");
highlightScript.src = basePath + "javascript/setupHighlight.js";
highlightScript.defer = true;
document.head.appendChild(highlightScript);