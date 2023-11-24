import { callNavbarTemplate, callFooterTemplate, changeToKontakt, changeToForside, changeToYdelser, changeToPortefolje, changeToOmMig } from "./template.js";

document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate()
    callFooterTemplate()
});

const pbForsideButton = document.getElementById("pbForsideButton")
const pbPortefoljeButton = document.getElementById("pbPortefoljeButton")
const pbYdelserButton = document.getElementById("pbYdelserButton")
const pbOmMigButton = document.getElementById("pbOmMigButton")
const pbKontaktButton = document.getElementById("pbKontaktButton")


pbForsideButton.addEventListener('click', changeToForside)
pbPortefoljeButton.addEventListener('click', changeToPortefolje)
pbYdelserButton.addEventListener('click', changeToYdelser)
pbOmMigButton.addEventListener('click', changeToOmMig)
pbKontaktButton.addEventListener('click', changeToKontakt)