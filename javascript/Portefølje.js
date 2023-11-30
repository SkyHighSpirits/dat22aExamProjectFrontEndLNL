import { callNavbarTemplate, callFooterTemplate } from "./template.js";

let currentPage = 0; // Holder styr på den aktuelle side

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fuldt indlæst og parset");
    callNavbarTemplate();
    callFooterTemplate();
    hentYdelser();
    hentPorteføljeEmner(); // Henter de første portefølje-emner ved indlæsning
});

function hentYdelser() {
    fetch('http://localhost:8080/api/operations')
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
        option.value = operation.operationId;
        option.textContent = operation.operationName;
        dropdown.appendChild(option);
    });
    console.log("Ydelser er tilføjet til dropdown-menuen");
}

function hentPorteføljeEmner() {
    // Ændring foretaget her: Antallet af emner pr. side sat til 3
    fetch(`http://localhost:8080/getPosts?page=${currentPage}&size=3`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netværksrespons var ikke ok');
            }
            return response.json();
        })
        .then(data => {
            opdaterPortefølje(data);
            currentPage++; // Forbereder den næste side
        })
        .catch(error => console.error('Fejl ved hentning af poster:', error));
}

function opdaterPortefølje(data) {
    const porteføljeContainer = document.getElementById('porteføljeContainer');

    data.forEach(item => {
        const emneDiv = document.createElement('div');
        emneDiv.classList.add('porteføljeEmne');


        const infoCon = document.createElement("div")
        infoCon.classList.add('infoCon')
        emneDiv.appendChild(infoCon)

        const titelDiv = document.createElement("div")
        titelDiv.classList.add('porteføljeTitel')
        titelDiv.textContent = item.poster.poster_Title
        emneDiv.appendChild(titelDiv)


        const beskrivelseDiv = document.createElement('div');
        beskrivelseDiv.classList.add('porteføljeBeskrivelse');
        beskrivelseDiv.textContent = item.poster.poster_Description;
        infoCon.appendChild(beskrivelseDiv);

        const billederDiv = document.createElement('div');
        billederDiv.classList.add('porteføljeBilleder');
        item.images.forEach(billede => {
            const img = document.createElement('img');
            img.src = 'data:image/jpeg;base64,' + billede.byte_img;
            img.classList.add('clickable-image')
            billederDiv.appendChild(img);
        });
        infoCon.appendChild(billederDiv);

        porteføljeContainer.appendChild(emneDiv);
        emneDiv.appendChild(infoCon)
    });
}

function openLargeImagePopup(imageSrc) {
    const popup = document.createElement('div');
    popup.classList.add('image-popup');
    popup.innerHTML = `<img src="${imageSrc}" alt="Large Image">`;

    // Append the popup to the body
    document.body.appendChild(popup);

    // Add a click event listener to close the popup when clicked
    popup.addEventListener('click', function () {
        document.body.removeChild(popup);
    });
}
// Funktion til at indlæse flere emner
function loadMore() {
    hentPorteføljeEmner();
}


document.addEventListener('click', function (event) {
    //hvis elemented har clickable-image class så :
    if (event.target.classList.contains('clickable-image')) {
        openLargeImagePopup(event.target.src);
    }
});

// Gør funktionerne tilgængelige globalt
window.hentPorteføljeEmner = hentPorteføljeEmner;
window.loadMore = loadMore;



