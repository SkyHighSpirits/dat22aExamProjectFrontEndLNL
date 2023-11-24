import { callNavbarTemplate, callFooterTemplate, changeToKontakt, changeToForside, changeToYdelser, changeToPortefolje, changeToOmMig } from "./template.js";

document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate()
    callFooterTemplate()
const pbForsideButton = document.getElementById("pbForsideButton")
const pbPortefoljeButton = document.getElementById("pbPortefoljeButton")
const pbYdelserButton = document.getElementById("pbYdelserButton")
const pbOmMigButton = document.getElementById("pbOmMigButton")
const pbKontaktButton = document.getElementById("pbKontaktButton")


let contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);

    const requestData = new URLSearchParams(formData);

    fetch('http://localhost:8080/send-email', {
        method: 'POST',
        body: requestData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(response => {
            if (response.ok) {
                console.log('Email sent successfully!');
            } else {
                console.log(response);
                console.log('Failed to send email.');
            }
        })
        .catch(error => {
            console.log('An error occurred:', error);
        });

});

pbForsideButton.addEventListener('click', changeToForside)
pbPortefoljeButton.addEventListener('click', changeToPortefolje)
pbYdelserButton.addEventListener('click', changeToYdelser)
pbOmMigButton.addEventListener('click', changeToOmMig)
pbKontaktButton.addEventListener('click', changeToKontakt)
});