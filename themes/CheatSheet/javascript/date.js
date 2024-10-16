// This file contains the javascript code for the TOC page.

var dates = document.getElementsByTagName("date");

let documentDate = "";

for (let date of dates) {
    if (date.innerHTML != "") {
        documentDate = date.innerHTML;
        break;
    }
}

if (documentDate == "") {
    documentDate = new Date();
    let options = { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' };
    documentDate = documentDate.toLocaleDateString('fr-FR', options);
}

for (let date of dates) {
    if (date.innerHTML == "") {
        date.innerHTML = documentDate;
    }
}