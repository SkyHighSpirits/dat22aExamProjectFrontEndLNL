function callNavbarTemplate() {
    // Load the navbar HTML content
    fetch('../html/Navbar.html')
        .then(response => response.text())
        .then(html => {
            // Insert the navbar into the current page
            document.body.insertAdjacentHTML('afterbegin', html);
            addNavEventListeners(); // Tilføj event listeners efter indlæsning
        });
}

let companyTitle;
let phone;
let cvr;



function callFooterTemplate() {

    //load the footer html content
    fetch('../html/Footer.html')
    .then(response => response.text())
    .then(html => {
        //Insert the footer into the current page
        document.body.insertAdjacentHTML('beforeend', html);
    });
}

function addNavEventListeners() {
    const pbForsideButton = document.getElementById("pbForsideButton");
    const pbPortefoljeButton = document.getElementById("pbPortefoljeButton");
    const pbYdelserButton = document.getElementById("pbYdelserButton");
    const pbOmMigButton = document.getElementById("pbOmMigButton");
    const pbKontaktButton = document.getElementById("pbKontaktButton");

    if (pbForsideButton) pbForsideButton.addEventListener('click', changeToForside);
    if (pbPortefoljeButton) pbPortefoljeButton.addEventListener('click', changeToPortefolje);
    if (pbYdelserButton) pbYdelserButton.addEventListener('click', changeToYdelser);
    if (pbOmMigButton) pbOmMigButton.addEventListener('click', changeToOmMig);
    if (pbKontaktButton) pbKontaktButton.addEventListener('click', changeToKontakt);
}

function addFooterNavEventListeners(data) {
    const footerForsideButton = document.getElementById("footerForsideButton");
    const footerPortefoljeButton = document.getElementById("footerPortefoljeButton");
    const footerYdelserButton = document.getElementById("footerYdelserButton");
    const footerOmMigButton = document.getElementById("footerOmMigButton");
    const footerKontaktButton = document.getElementById("footerKontaktButton");
    companyTitle = document.getElementById("title-field")
    phone = document.getElementById("phone-field")
    cvr = document.getElementById("cvr-field")
    console.log(companyTitle.value)
    console.log(phone.value)
    console.log(cvr.value)

    companyTitle.innerHTML = data.company_Title;
    phone.innerHTML = "Telefon: " + data.telephone;
    cvr.innerHTML = "Cvr: " + data.cvr;

    if (footerForsideButton) footerForsideButton.addEventListener('click', changeToForside);
    if (footerPortefoljeButton) footerPortefoljeButton.addEventListener('click', changeToPortefolje);
    if (footerYdelserButton) footerYdelserButton.addEventListener('click', changeToYdelser);
    if (footerOmMigButton) footerOmMigButton.addEventListener('click', changeToOmMig);
    if (footerKontaktButton) footerKontaktButton.addEventListener('click', changeToKontakt);
}

async function callCompanyInformation() {
    try {
        const response = await fetch(globalURL+"/company")

        const data = await response.json();
        if (response.ok)
        {
            addFooterNavEventListeners(data);
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

function changeToKontakt() {
    window.location.replace("KontaktPage.html");
}

function changeToOmMig() {
    window.location.replace("OmMigPage.html");
}

function changeToYdelser() {
    window.location.replace("YdelserPage.html");
}

function changeToPortefolje() {
    window.location.replace("PorteFøljePage.html");
}

function changeToForside() {
    window.location.replace("Frontpage.html");
}

export{callCompanyInformation, callNavbarTemplate, callFooterTemplate, changeToKontakt, changeToOmMig, changeToPortefolje, changeToYdelser, changeToForside};
