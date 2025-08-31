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
cssLink.rel = "stylesheet";
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