import { callNavbarTemplate, callFooterTemplate } from "./template.js";

/*document.addEventListener("DOMContentLoaded", function () {
    // Load the navbar HTML content
    fetch('../html/Navbar.html')
        .then(response => response.text())
        .then(html => {
        // Insert the navbar into the current page
        document.body.insertAdjacentHTML('afterbegin', html);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Load the navbar HTML content
    fetch('../html/Footer.html')
        .then(response => response.text())
        .then(html => {
        // Insert the navbar into the current page
        document.body.insertAdjacentHTML('beforeend', html);
    });
});
*/


document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate()
    callFooterTemplate()
});