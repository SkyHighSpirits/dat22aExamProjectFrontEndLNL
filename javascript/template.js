function callNavbarTemplate() {

    // Load the navbar HTML content
    fetch('../html/Navbar.html')
        .then(response => response.text())
        .then(html => {
        // Insert the navbar into the current page
        document.body.insertAdjacentHTML('afterbegin', html);
        });
}

function callFooterTemplate() {

    //load the footer html content
    fetch('../html/Footer.html')
    .then(response => response.text())
    .then(html => {
        //Insert the footer into the current page
        document.body.insertAdjacentHTML('beforeend', html);
    });
}

function changeToKontakt() {
    window.location.replace("KontaktPage.html");
}

function changeToOmMig() {
    window.location.replace("OmMigPage.html");
}

function changeToYdelser() {
    window.location.replace("YdelserPage.html");
}

function changeToPortefolje() {
    window.location.replace("PorteFøljePage.html");
}

function changeToForside() {
    window.location.replace("Frontpage.html");
}

export{callNavbarTemplate, callFooterTemplate, changeToKontakt, changeToOmMig, changeToPortefolje, changeToYdelser, changeToForside};
