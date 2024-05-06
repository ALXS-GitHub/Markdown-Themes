// create link element for KaTeX CSS file
var cssLinkKatex = document.createElement("link");
cssLinkKatex.rel = "stylesheet";
cssLinkKatex.href = "https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css";
cssLinkKatex.integrity = "sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww";
cssLinkKatex.crossOrigin = "anonymous";
document.head.appendChild(cssLinkKatex);

// create script element for KaTeX
var katexScript = document.createElement("script");
katexScript.defer = true;
katexScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js";
katexScript.integrity = "sha384-hIoBPJpTUs74ddyc4bFZSM1TVlQDA60VBbJS0oA934VSz82sBx1X7kSx2ATBDIyd";
katexScript.crossOrigin = "anonymous";
katexScript.onload = function() {
    // create script element for KaTeX auto-render extension
    var autoRenderScript = document.createElement("script");
    autoRenderScript.defer = true;
    autoRenderScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js";
    autoRenderScript.integrity = "sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk";
    autoRenderScript.crossOrigin = "anonymous";
    autoRenderScript.onload = renderMath;
    document.head.appendChild(autoRenderScript);
};
document.head.appendChild(katexScript);

function renderMath() {
    if (window.katex && window.renderMathInElement) {
        renderMathInElement(document.body, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\begin{equation}", right: "\\end{equation}", display: true},
                {left: "\\(", right: "\\)", display: false}
            ]
        });
    }
}