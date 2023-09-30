var elements = ['definition', 'note', 'warning', 'tip', 'important', 'error', 'success', 'abstract', 'example', 'question', 'quote', 'bug']
// these elements are classes

// for each element, add the a div with the class 'block-title' and the svg element with the same name as the element in the title

svg_folder = "./icons"

elements.forEach(element => {
    var block = document.querySelectorAll(`.${element}`)
    for (var i = 0; i < block.length; i++) {
        var blockTitle = document.createElement("div")
        blockTitle.classList.add("block-title")

        var title = document.createElement("span")
        title.textContent = element.charAt(0).toUpperCase() + element.slice(1)
        title.classList.add("block-title-text")

        // add the title to the block title
        blockTitle.appendChild(title)

        // add the block title to the block
        block[i].insertBefore(blockTitle, block[i].firstChild);


    }
})

