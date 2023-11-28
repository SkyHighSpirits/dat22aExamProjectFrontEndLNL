import { callNavbarTemplate, callFooterTemplate, changeToKontakt, changeToForside, changeToYdelser, changeToPortefolje, changeToOmMig } from "./template.js";

document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate()
    callFooterTemplate()
});

// Ingen yderligere kode er nødvendig her for at tilknytte event listeners til navigationsknapperne,
// da dette nu håndteres i 'template.js'.
// Hvis der er en kontaktformular på forsiden, skal du tilføje event listener til den.
let contactForm = document.getElementById("contact-form");
if (contactForm) {
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
}