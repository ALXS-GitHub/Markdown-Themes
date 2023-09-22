// Get all the <fnote> elements
const SEPARATOR = "||";
var fnoteElements = document.getElementsByTagName("fnote");
var footerElement = document.getElementById("footer");

if (footerElement === null) {
    footerElement = document.createElement("footer");
    // Add the <footer> element to the document
    document.body.insertAdjacentElement("afterend", footerElement);
}

// Loop through the <fnote> elements
for (var i = 0; i < fnoteElements.length; i++) {
    // Get the text content of the <fnote> element
    var fnoteText = fnoteElements[i].textContent;

    // Find the separator character (default is ";")
    var separatorIndex = fnoteText.indexOf(SEPARATOR);
    console.log("separatorIndex: " + separatorIndex);

    // If the separator character is found, split the text into two parts
    if (separatorIndex !== -1) {
        var fnoteTextBefore = fnoteText.substring(0, separatorIndex);
        var fnoteTextAfter = fnoteText.substring(separatorIndex + 1);
        fnoteTextAfter = fnoteTextAfter.substring(1);
        fnoteTextAfter = fnoteTextAfter.trim();

        // Set the text content of the <fnote> element to the part that remains in the text
        fnoteElements[i].textContent = fnoteTextBefore;

        // add an id to the <fnote> element
        fnoteElements[i].id = "fn" + (i + 1);

        // Create a new <footnote> element for the part that goes in the footer
        var footnoteElement = document.createElement("footnote");
        footnoteElement.id = "ffn" + (i + 1);
        footnoteElement.textContent = fnoteTextAfter;

        // Replace the <fnote> element with a link to the <footnote> element
        var footnoteLink = document.createElement("a");
        footnoteLink.classList.add("footnoteLink");
        footnoteLink.href = "#ffn" + (i + 1);
        footnoteLink.textContent = "[" + (i + 1) + "]";
        fnoteElements[i].appendChild(footnoteLink);

        // Add the reverse link to the <footnote> element
        var reverseLink = document.createElement("a");
        reverseLink.classList.add("reverseLink");
        reverseLink.href = "#fn" + (i + 1);
        reverseLink.textContent = `[${(i + 1)}]`;
        footnoteElement.insertBefore(reverseLink, footnoteElement.firstChild);

        // Add the <footnote> element to the footer section
        footerElement.appendChild(footnoteElement);
    }
}