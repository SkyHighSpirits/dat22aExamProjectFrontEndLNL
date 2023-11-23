import { callNavbarTemplate, callFooterTemplate } from "./template.js";


document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate()
    callFooterTemplate()
});

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