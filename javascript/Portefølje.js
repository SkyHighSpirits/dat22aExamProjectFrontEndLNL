import { callNavbarTemplate, callFooterTemplate, changeToKontakt, changeToForside, changeToYdelser, changeToPortefolje, changeToOmMig } from "./template.js";

document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate()
    callFooterTemplate()
});

// Alle event listeners for navigationsknapper er nu håndteret i template.js
// Derfor er der ikke behov for yderligere kode her til at tilføje event listeners
