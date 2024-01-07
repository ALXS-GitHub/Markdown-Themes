// converts a markdown table to a html table

function getAlignement(line) {
    
        const cells = line.split("|");
        const alignement = [];
    
        const cell = cells[0].trim();

        if (cell.startsWith(":") && cell.endsWith(":")) {
            alignement.push("center");
        } else if (cell.startsWith(":")) {
            alignement.push("left");
        } else if (cell.endsWith(":")) {
            alignement.push("right");
        } else {
            alignement.push("left");
        }
    
        return alignement;
    }

function convertToTable(text) {

    const lines = text.split("\n");
    const table = [];
    let alignement;

    for (let i = 0; i < lines.length; i++) {

        if (i === 1) {
            alignement = getAlignement(lines[i]);
            continue;
        }

        let line = lines[i].trim();

        if (line[0] !== "|" && line[line.length - 1] !== "|") {
            // TODO : add a warning message on vscode
            return text;
        }

        line = line.slice(1, line.length - 1);

        const cells = line.split("|");
        const row = [];

        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            row.push(cell.trim());
        }

        table.push(row);
    }

    console.log(table);

    let tableHtml = `<table class="${alignement}">\n`
    let bodySet = false;

    for (let i = 0; i < table.length; i++) {
        
        if (i === 0) {
            tableHtml += '\t<thead>\n';
        }

        if (i > 0 && !bodySet) {
            tableHtml += '\t<tbody>\n';
            bodySet = true;
        }

        const row = table[i];

        tableHtml += '\t\t<tr>\n';

        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            let tag = 'td rowspan="1"';
            let tagOut = 'td';

            if (i === 0) {
                tag = 'th colspan="1"';
                tagOut = 'th';
            }

            tableHtml += `\t\t\t<${tag}>${cell}</${tagOut}>\n`;
        }

        tableHtml += '\t\t</tr>\n';

        if (i === 0) {
            tableHtml += '\t</thead>\n';
        }

        if (i === table.length - 1) {
            tableHtml += '\t</tbody>\n';
        }

    }

    tableHtml += '</table>\n';

    return tableHtml
}

module.exports = {
    convertToTable
};