// Portefølje.js

import { callNavbarTemplate, callFooterTemplate } from "./template.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fuldt indlæst og parset");
    callNavbarTemplate();
    callFooterTemplate();
    hentYdelser(); // Tilføj dette kald for at hente ydelser ved indlæsning
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
    const valgtYdelse = document.getElementById('ydelserDropdown').value;
    if (!valgtYdelse) {
        console.log("Ingen ydelse valgt");
        return; // Stopper funktionen, hvis ingen ydelse er valgt
    }

    // Her skal du tilføje kode til at hente specifikke data baseret på den valgte ydelse
    // og opdatere DOM'en med de hentede portefølje-emner.
    // For nu, lad os antage, at vi har nogle dummy data:
    const emner = [
        { beskrivelse: "Eksempel 1", billeder: ["billede1.jpg", "billede2.jpg"] },
        { beskrivelse: "Eksempel 2", billeder: ["billede3.jpg", "billede4.jpg"] }
        // ... flere emner
    ];

    const porteføljeContainer = document.getElementById('porteføljeContainer');
    porteføljeContainer.innerHTML = ''; // Ryd tidligere indhold

    emner.forEach(emne => {
        const emneDiv = document.createElement('div');
        emneDiv.classList.add('porteføljeEmne');

        const beskrivelseDiv = document.createElement('div');
        beskrivelseDiv.classList.add('porteføljeBeskrivelse');
        beskrivelseDiv.textContent = emne.beskrivelse;
        emneDiv.appendChild(beskrivelseDiv);

        const billederDiv = document.createElement('div');
        billederDiv.classList.add('porteføljeBilleder');
        emne.billeder.forEach(billede => {
            const img = document.createElement('img');
            img.src = billede;
            billederDiv.appendChild(img);
        });
        emneDiv.appendChild(billederDiv);

        porteføljeContainer.appendChild(emneDiv);
    });

    console.log("Portefølje-emner er blevet opdateret baseret på valgt ydelse");
}

window.hentPorteføljeEmner = hentPorteføljeEmner; // Gør funktionen tilgængelig globalt
