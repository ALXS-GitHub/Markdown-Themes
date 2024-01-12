hljs.highlightAll();

function changeCodeHighlightTheme(theme) {
    var highlightCssLink = document.getElementById("highlightCssLink");
    highlightCssLink.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/" + theme + ".min.css";
}

function trimCodeBlocks() {
    var codeBlocks = document.querySelectorAll("pre code");
    codeBlocks.forEach(function(block) {
        block.innerHTML = block.innerHTML.trim();
    });
}