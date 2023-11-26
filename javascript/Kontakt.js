import { callNavbarTemplate, callFooterTemplate } from "./template.js";

document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate();
    callFooterTemplate();
});

// Ingen yderligere kode er nødvendig her for at tilknytte event listeners til navigationsknapperne,
// da dette nu håndteres i 'template.js'.