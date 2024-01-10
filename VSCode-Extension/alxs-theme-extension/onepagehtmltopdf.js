const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

// & input file

async function onePageHtmlToPdf(htmlPath) {

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

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    const fileUrl = `file://${path.resolve(htmlPath)}`;
    await page.goto(fileUrl, { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen");
    await page.reload({ waitUntil: "networkidle0" }); // in order to load all ressources properly

    // get the background color of the html file
    const backgroundColor = await page.evaluate(
        () => getComputedStyle(document.body).backgroundColor
    );
    // set the background color of the pdf file
    await page.evaluate((color) => {
        document.body.style.backgroundColor = color;
    }, backgroundColor);

    const scrollHeight = await page.evaluate(() => { return document.documentElement.scrollHeight; });

    await page.pdf({
        path: outputFilename,
        // format: "A4",
        printBackground: true,
        margin: { top: "0", bottom: "0", right: "0", left: "0" },
        displayHeaderFooter: false,
        height: `${scrollHeight + 1}px`,
        headerTemplate: '<span></span>',
        footerTemplate: '<span></span>',
        pageRanges: '1',
    });
    await browser.close();
}

// & convert

module.exports = {
    onePageHtmlToPdf
};
