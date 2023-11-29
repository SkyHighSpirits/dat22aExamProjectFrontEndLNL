
// Add event listener for the "Upload" button
document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton')
    if (uploadButton) {
        uploadButton.addEventListener('click', uploadPost);
    }
});
const postUrl = 'localhost:8080/createPost'

function uploadPost() {
    const inputDescription = document.getElementById('description')
    const inputTitel = document.getElementById('titleinput')
    const input = document.getElementById('imageInput')
    const file = input.files;

    if (file.length > 0) {
        const formdata = new FormData();

        //håndtere titel og description tekst:
        formdata.append('title', inputTitel.value)
        formdata.append('description', inputDescription.value)
        //håndtere billeder :
        for (let i = 0; i < input.files.length; i++) {
            formdata.append('images', file[i])
        }

        fetch('http://localhost:8080/createPost', {
            method: 'POST',
            body: formdata
        })
            .then(response => response.text())
            .then(data => {
                document.getElementById('response').innerText = data;
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('response').innerText = 'Error creating post';
            });
    } else {
        document.getElementById('response').innerText = 'Please select an image to upload';
    }
}

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
    console.log('Opdater Company Formular indsendt');
    // Tilføj logik her for at sende de opdaterede data til serveren
    // Skjul formular efter indsendelse
    document.getElementById('updateCompanyForm').style.display = 'none';
});

// Yderligere event listeners kan tilføjes her for Ydelser og Company sektionerne
// ...

// Husk at tilføje tilsvarende logik og event listeners for Ydelser og Company sektionerne


