const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

// & input file

async function htmlToPdf(htmlPath) {

    if (!fs.existsSync(htmlPath)) {
        console.log(`File ${htmlPath} does not exist`);
        throw new Error(`File ${htmlPath} does not exist`);
    }

    if (path.extname(htmlPath) !== ".html") {
        console.log("File is not html");
        throw new Error("File is not html");
    }

    let outputFilename;

    if (path.basename(htmlPath).endsWith("_tmp.html")) {
        outputFilename = htmlPath.replace(/_tmp\.html$/, ".pdf");
    } else {
        outputFilename = htmlPath.replace(/\.html$/, ".pdf");
    }

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const fileUrl = `file://${path.resolve(htmlPath)}`;
    await page.goto(fileUrl, { waitUntil: "networkidle0" });
    await page.emulateMediaType('screen');
    await page.reload({ waitUntil: "networkidle0" }); // in order to load all ressources properly
    await page.pdf({ path: outputFilename, format: "A4", printBackground: true, margin: { top: '1cm', bottom: '1cm' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>'
  });
    await browser.close();
}

// & convert

module.exports = {
    htmlToPdf
};
