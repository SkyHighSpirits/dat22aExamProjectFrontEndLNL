import { callNavbarTemplate, callFooterTemplate } from "./template.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fuldt indlæst og parset");
    callNavbarTemplate();
    callFooterTemplate();
    hentYdelser(); // Tilføj dette kald for at hente ydelser ved indlæsning
    hentPorteføljeEmner(); // Tilføjer et kald til at hente portefølje-emner ved indlæsning
});

function hentYdelser() {
    fetch('http://localhost:8083/api/operations') // Erstat med den korrekte URL til din backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Netværksrespons var ikke ok');
            }
            return response.json();
        })
        .then(data => opdaterDropdown(data))
        .catch(error => console.error('Fejl ved hentning af ydelser:', error));
}

function opdaterDropdown(data) {
    const dropdown = document.getElementById('ydelserDropdown');
    data.forEach(operation => {
        const option = document.createElement('option');
        option.value = operation.operationId; // Brug operationId som værdi
        option.textContent = operation.operationName; // Brug operationName som tekst
        dropdown.appendChild(option);
    });
    console.log("Ydelser er tilføjet til dropdown-menuen");
}

function hentPorteføljeEmner() {
    fetch('http://localhost:8083/getPosts') // Erstat med den korrekte URL til din backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Netværksrespons var ikke ok');
            }
            return response.json();
        })
        .then(data => opdaterPortefølje(data))
        .catch(error => console.error('Fejl ved hentning af poster:', error));
}

function opdaterPortefølje(data) {
    const porteføljeContainer = document.getElementById('porteføljeContainer');
    porteføljeContainer.innerHTML = ''; // Ryd tidligere indhold

    data.forEach(item => {
        const emneDiv = document.createElement('div');
        emneDiv.classList.add('porteføljeEmne');

        const beskrivelseDiv = document.createElement('div');
        beskrivelseDiv.classList.add('porteføljeBeskrivelse');
        beskrivelseDiv.textContent = item.poster.poster_Description; // Antager at din Poster-klasse har en beskrivelse
        emneDiv.appendChild(beskrivelseDiv);

        const billederDiv = document.createElement('div');
        billederDiv.classList.add('porteføljeBilleder');
        item.images.forEach(billede => {
            const img = document.createElement('img');
            img.src = 'data:image/jpeg;base64,' + billede.byte_img; // Antager at billedet er i base64-format
            billederDiv.appendChild(img);
        });
        emneDiv.appendChild(billederDiv);

        porteføljeContainer.appendChild(emneDiv);
    });

    console.log("Portefølje-emner er blevet opdateret");
}

window.hentPorteføljeEmner = hentPorteføljeEmner; // Gør funktionen tilgængelig globalt

