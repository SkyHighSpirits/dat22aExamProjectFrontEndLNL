import { callNavbarTemplate, callFooterTemplate } from "./template.js";


document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate()
    callFooterTemplate()
});

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
                    alert("Failed to send email, server is too busy, try again in 3 seconds")
                    console.log('Failed to send email');
                }
            })
            .catch(error => {
                console.log('An error occurred:', error);
            });
    });
}

