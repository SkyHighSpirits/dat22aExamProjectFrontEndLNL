import { callNavbarTemplate, callFooterTemplate, changeToKontakt, changeToForside, changeToYdelser, changeToPortefolje, changeToOmMig } from "./template.js";

function getParameterByName(element_name, url) {
    if (!url) url = window.location.href;
    element_name = element_name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + element_name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate();
    callFooterTemplate();

    let company = callCompanyInformation();

    var name = getParameterByName('name');
    var description = getParameterByName('description');
    let phone = document.getElementById('phone_number');
    phone.value = company.telephone;

    if (name !== null && description !== null) {
        // Set the inner text of the "about" element with the values from the query parameters

        document.getElementById("about").value = "Tilbud på " + name;
        document.getElementById("message").value = "Ønsket service: " + description;
    }
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

        fetch(globalURL+'/send-email', {
            method: 'POST',
            body: requestData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => {
                if (response.ok) {
                    alert("Email sendt. Vi svarer tilbage ved første ledige lejlighed")
                    console.log('Email sent successfully!');
                } else {
                    console.log(response);
                    alert("Fejl ved afsendelse af email!\n\n Årsag: serveren har for tralvt, prøv igen om 5 sekunder")
                    console.log('Failed to send email');
                }
            })
            .catch(error => {
                console.log('An error occurred:', error);
            });
    });
}

async function callCompanyInformation() {
    try {
        const response = await fetch(globalURL+"/company")

        if (response.ok)
        {
            return await response.json();
        }
        else
        {
            console.log ("Could not fetch data")
        }
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

