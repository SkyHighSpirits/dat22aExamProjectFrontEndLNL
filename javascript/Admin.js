// Visning og skjulning af Portefølje Oversigt
document.getElementById('showPortfolioOverviewBtn').addEventListener('click', function() {
    console.log('Portefølje Oversigt-knap klikket');
    document.getElementById('portfolioOverview').style.display = 'block';
});

document.getElementById('backFromPortfolioOverview').addEventListener('click', function() {
    console.log('Tilbage fra Portefølje Oversigt-knap klikket');
    document.getElementById('portfolioOverview').style.display = 'none';
});

// Visning af Tilføj Portefølje Formular
document.getElementById('addPortfolioBtn').addEventListener('click', function() {
    console.log('Tilføj Portefølje-knap klikket');
    document.getElementById('addPortfolioForm').style.display = 'block';
});

// Skjulning af Tilføj Portefølje Formular
document.getElementById('backFromAddPortfolio').addEventListener('click', function() {
    console.log('Tilbage fra Tilføj Portefølje-knap klikket');
    document.getElementById('addPortfolioForm').style.display = 'none';
});

// Håndtering af Tilføj Portefølje Formular Indsendelse
document.getElementById('newPortfolioForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Tilføj Portefølje Formular indsendt');
    // Tilføj logik her for at sende formular data til serveren
    // Skjul formular efter indsendelse
    document.getElementById('addPortfolioForm').style.display = 'none';
});

// Visning og skjulning af Slet Portefølje Sektion
document.getElementById('deletePortfolioBtn').addEventListener('click', function() {
    console.log('Slet Portefølje-knap klikket');
    document.getElementById('deletePortfolioSection').style.display = 'block';
    // Tilføj logik her for at hente og vise portefølje-emner
});

document.getElementById('backFromDeletePortfolio').addEventListener('click', function() {
    console.log('Tilbage fra Slet Portefølje-knap klikket');
    document.getElementById('deletePortfolioSection').style.display = 'none';
});

// ------  YDELSER --------

// Visning og skjulning af Ydelser Oversigt
document.getElementById('showServicesOverviewBtn').addEventListener('click', function() {
    console.log('Oversigt-knap for Ydelser klikket');
    document.getElementById('servicesOverview').style.display = 'block';
});

document.getElementById('backFromServicesOverview').addEventListener('click', function() {
    console.log('Tilbage-knap for Ydelser klikket');
    document.getElementById('servicesOverview').style.display = 'none';
});

// Visning af Tilføj Ydelse Formular
document.getElementById('addServiceBtn').addEventListener('click', function() {
    console.log('Tilføj Ydelse-knap klikket');
    document.getElementById('addServiceForm').style.display = 'block';
});

// Skjulning af Tilføj Ydelse Formular
document.getElementById('backFromAddService').addEventListener('click', function() {
    console.log('Tilbage fra Tilføj Ydelse-knap klikket');
    document.getElementById('addServiceForm').style.display = 'none';
});

// Håndtering af Tilføj Ydelse Formular Indsendelse
document.getElementById('newServiceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Tilføj Ydelse Formular indsendt');
    // Tilføj logik her for at sende formular data til serveren
    // Skjul formular efter indsendelse
    document.getElementById('addServiceForm').style.display = 'none';
});

// Visning og skjulning af Slet Ydelse Sektion
document.getElementById('deleteServiceBtn').addEventListener('click', function() {
    console.log('Slet Ydelse-knap klikket');
    document.getElementById('deleteServiceSection').style.display = 'block';
    // Tilføj logik her for at hente og vise ydelser
});

document.getElementById('backFromDeleteService').addEventListener('click', function() {
    console.log('Tilbage fra Slet Ydelse-knap klikket');
    document.getElementById('deleteServiceSection').style.display = 'none';
});

// ------  COMPANY --------

// Visning og skjulning af Company Oversigt
document.getElementById('showCompanyOverviewBtn').addEventListener('click', function() {
    console.log('Oversigt-knap for Company klikket');
    document.getElementById('companyOverview').style.display = 'block';
});

document.getElementById('backFromCompanyOverview').addEventListener('click', function() {
    console.log('Tilbage-knap for Company klikket');
    document.getElementById('companyOverview').style.display = 'none';
});

// Visning af Opdater Company Formular
document.getElementById('updateCompanyBtn').addEventListener('click', function() {
    console.log('Opdater Company-knap klikket');

    document.getElementById('updateCompanyForm').style.display = 'block';
    getCompanyInformation();
    // Tilføj logik her for at hente eksisterende company data fra serveren og udfylde formularen
});

// Skjulning af Opdater Company Formular
document.getElementById('backFromUpdateCompany').addEventListener('click', function() {
    console.log('Tilbage fra Opdater Company-knap klikket');
    document.getElementById('updateCompanyForm').style.display = 'none';
});

// Håndtering af Opdater Company Formular Indsendelse
document.getElementById('companyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    updateCompanyInformation();
    console.log('Opdater Company Formular indsendt');
    document.getElementById('updateCompanyForm').style.display = 'none';
});

const updateCompanyURL = 'http://localhost:8080/update-company';

async function getCompanyInformation() {
    try {
        const response = await fetch("http://localhost:8080/company")

        const data = await response.json();
        if (response.ok) {
            // Assuming these are input elements
            document.getElementById("companyCVR").value = data.cvr;
            document.getElementById("companyTitle").value = data.company_Title;
            document.getElementById("companyDescription").value = data.company_Description;
            document.getElementById("companyNumber").value = data.telephone;
        } else {
            console.log("Could not fetch data");
        }
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
};

async function updateCompanyInformation() {
    // Move these declarations inside the function
    let companyCVR = document.getElementById("companyCVR").value;
    let companyTitle = document.getElementById("companyTitle").value;
    let companyDescription = document.getElementById("companyDescription").value;
    let companyNumber = document.getElementById("companyNumber").value;

    const updateCompanyURL = 'http://localhost:8080/update-company';

    fetch(updateCompanyURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type
        },
        body: new URLSearchParams({
            company_title: companyTitle,
            company_description: companyDescription,
            cvr: companyCVR,
            telephone: companyNumber,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if(response.ok)
            {
                alert("Dine firma oplysninger blev opdateret succesfuldt");
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // Log the response from the server
            // Handle the success response as needed
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle errors here
        });
}

// Yderligere event listeners kan tilføjes her for Ydelser og Company sektionerne
// ...

// Husk at tilføje tilsvarende logik og event listeners for Ydelser og Company sektionerne


