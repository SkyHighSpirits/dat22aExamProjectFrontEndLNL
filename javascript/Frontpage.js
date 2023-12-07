import { callNavbarTemplate, callFooterTemplate } from "./template.js";


document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate()
    callFooterTemplate()
    rotateCarousel()
});

let contactForm = document.getElementById("contact-form");

function rotateCarousel(){
    var counter = 1
    setInterval(function (){
        document.getElementById('radio'+ counter).checked = true
        counter++
        if(counter > 6){
            counter = 1;
        }

    }, 5000)
}

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

