/*document.addEventListener("DOMContentLoaded", function () {
callNavbarTemplate()
callNavbarTemplate()

});
*/


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

export{callNavbarTemplate, callFooterTemplate};
