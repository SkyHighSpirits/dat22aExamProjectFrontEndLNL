
// Add event listener for the "Upload" button
function createPortfolioForm()
{
    var parentElement = document.getElementById('addPortfolioForm');

// Create the form element
    var formElement = document.createElement('form');
    formElement.id = 'newPortfolioForm';

// Create the label for the title input
    var titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'titleinput');
    titleLabel.textContent = 'Titel';
    formElement.appendChild(titleLabel);

// Create the title input element
    var titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'titleinput';
    titleInput.name = 'titleinput';
    formElement.appendChild(titleInput);
    formElement.appendChild(document.createElement('br'));

// Create the label for the description input
    var descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Beskrivelse';
    formElement.appendChild(descriptionLabel);

// Create the description input element
    var descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.id = 'description';
    descriptionInput.name = 'description';
    formElement.appendChild(descriptionInput);
    formElement.appendChild(document.createElement('br'));

// Create the file input element
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'imageInput';
    fileInput.accept = 'image/*';
    fileInput.multiple = true;
    fileInput.required = true;
    formElement.appendChild(fileInput);
    formElement.appendChild(document.createElement('br'));

// Create the Upload button
    var uploadButton = document.createElement('button');
    uploadButton.type = 'button';
    uploadButton.id = 'uploadButton';
    uploadButton.textContent = 'Upload';
    formElement.appendChild(uploadButton);

    uploadButton.addEventListener('click', function()
    {
        openModal()
        setButtonID("uploadButton")
    });

// Create the Back button
    var backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.id = 'backFromAddPortfolio';
    backButton.textContent = 'Tilbage';
    formElement.appendChild(backButton);

// Append the form to the parent element
    parentElement.appendChild(formElement);
}

document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton')
    if (uploadButton) {
        uploadButton.addEventListener('click', uploadPost);
    }
});

function uploadPost(username, password) {
    const inputDescription = document.getElementById('description')
    const inputTitel = document.getElementById('titleinput')
    const input = document.getElementById('imageInput')
    const file = input.files;

    if (file.length > 0) {
        const formdata = new FormData();

        //håndtere titel og description tekst:
        formdata.append('title', inputTitel.value)
        formdata.append('description', inputDescription.value);

        formdata.append('username', username);
        formdata.append('password', password);

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
let username
let password

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
    emptyPortfolioContainer();
    createPortfolioForm();
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
    setButtonID('newPortfolioForm');
    openModal();
    // Skjul formular efter indsendelse
    document.getElementById('addPortfolioForm').style.display = 'none';
});

// Visning og skjulning af Slet Portefølje Sektion
document.getElementById('deletePortfolioBtn').addEventListener('click', function() {
    console.log('Slet Portefølje-knap klikket');
    setButtonID('deletePortfolioBtn')
    openModal();
    document.getElementById('deletePortfolioSection').style.display = 'block';
    // Tilføj logik her for at hente og vise portefølje-emner
});

document.getElementById('backFromDeletePortfolio').addEventListener('click', function() {
    console.log('Tilbage fra Slet Portefølje-knap klikket');
    document.getElementById('deletePortfolioSection').style.display = 'none';
    window.location.reload();
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
    setButtonID('newServiceForm');
    openModal();
    // Tilføj logik her for at sende formular data til serveren
    // Skjul formular efter indsendelse
    document.getElementById('addServiceForm').style.display = 'none';
});

// Visning og skjulning af Slet Ydelse Sektion
document.getElementById('deleteServiceBtn').addEventListener('click', function() {
    console.log('Slet Ydelse-knap klikket');
    document.getElementById('deleteServiceSection').style.display = 'block';
    setButtonID('deleteServiceBtn')
    openModal();
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
    setButtonID("companyForm");
    openModal();
    console.log('Opdater Company Formular indsendt');
    document.getElementById('updateCompanyForm').style.display = 'none';
});

let openBtn;

async function setButtonID(elementId)
{
    openBtn = document.getElementById(elementId)
}

const closeBtn = document.getElementById("closeModal")
const modal = document.getElementById("modal")

async function openModal()
{
    modal.classList.add("open")
}

closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
});

document.querySelector('#modal form').addEventListener('submit', function (event) {
    event.preventDefault();
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;

    // Add logic here to handle the login (e.g., send credentials to the server)
    if(openBtn.id === 'companyForm')
    {
        updateCompanyInformation(username, password)
    }
    if(openBtn.id === 'newServiceForm')
    {
        addOperation(username, password)
    }
    if(openBtn.id === 'deleteServiceBtn')
    {
        deleteOperation(username, password)
    }
    if(openBtn.id === 'deletePortfolioBtn')
    {
        emptyPortfolioContainer()
        hentPorteføljeEmner(username, password)
    }
    if(openBtn.id === 'uploadButton')
    {
        uploadPost(username, password);
    }
    // For now, just close the modal
    modal.classList.remove('open');
});



async function addOperation(username, password)
{
  const operationName = document.getElementById("serviceName").value;
  const operationDescription = document.getElementById("serviceDescription").value;

  try {
    const response = await fetch("http://localhost:8080/createOperation", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        operation_name: operationName,
        operation_description: operationDescription,
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

async function deleteOperation(id, username, password) {
    const url = `http://localhost:8080/deleteOperation?operation_id=${id}&username=${username}&password=${password}`;

    // Fetch options for DELETE request
    const fetchOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Make the fetch request
    await fetch(url, fetchOptions)
        .then(response => {
            if (response.ok) {
                console.log("Operation slettet");
                // Opdater eventuelt UI her
            } else if (response.status === 404) {
                console.log("Operation ikke fundet");
            } else if (response.status === 401) {
                console.log("Uautoriseret adgang");
            } else {
                console.error("Fejl ved sletning af operation");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}


async function deletePoster(id, username, password) {
    // API endpoint for deletePoster
    const url = `http://localhost:8080/deletePoster?poster_id=${id}&username=${username}&password=${password}`;

    // Fetch options for DELETE request
    const fetchOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Make the fetch request
    await fetch(url, fetchOptions)
        .then(response => {
            if (response.ok) {
                // Poster deleted successfully
                console.log("Poster deleted successfully");
            } else if (response.status === 404) {
                // Poster not found
                alert("Fejl. Prøv at genloade siden og prøv igen")
                console.log("Poster not found");
            } else if (response.status === 401) {
                // Unauthorized access (password incorrect)
                alert("Fejl. Prøv at genloade siden og prøv igen")
                console.log("Unauthorized access");
            } else {
                // Other errors
                console.log(response)
                console.error("Error deleting poster");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}


async function addPortfolio(username, password)
{
    //IMPLEMENT YOUR FETCH HERE
}

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

async function updateCompanyInformation(username, password) {
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
            username: username,
            password: password
        }),
    })
        .then(response => {
            console.log(response)
            console.log(response.status)

            if (response.ok) {
                alert("Dine firma oplysninger blev opdateret succesfuldt");
                return response.text();
            } else if (response.status === 401) {
                alert("Forkert password eller username");
                throw new Error('Authentication error');
            } else {
                alert("An error occured");
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log(data); // Log the response from the server
            // Handle the success response as needed
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Log the error message received from the server
            console.error('Server error:', error.message);
            // Handle errors here
        });
}

async function hentPorteføljeEmner(username, password) {

    await fetch(`http://localhost:8080/getPostsPwd?username=${username}&password=${password}`)
        .then(response => {
            if(response.status === 401)
            {
                alert("Forkert password eller username")
            }
            else if (!response.ok) {
                throw new Error('Netværksrespons var ikke ok');
            }
            return response.json();
        })
        .then(data => {
            opdaterPortefølje(data);
        // Forbereder den næste side
        })
        .catch(error => console.error('Fejl ved hentning af poster:', error));
}


async function opdaterPortefølje(data) {
    const porteføljeContainer = document.getElementById('porteføljeContainer');

    await data.forEach(item => {
        const emneDiv = document.createElement('div');
        emneDiv.classList.add('porteføljeEmne');

        const infoCon = document.createElement("div")
        infoCon.classList.add('infoCon')
        emneDiv.appendChild(infoCon)

        const deleteButton = document.createElement('button')
        infoCon.appendChild(deleteButton);
        deleteButton.className = "deletePortfolioButton";
        let id = item.poster.id
        console.log(id)
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener('click', function() {
                deletePoster(id, username, password)
                emptyPortfolioContainer()
                hentPorteføljeEmner(username, password)
        });

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

function emptyPortfolioContainer() {
    const container = document.getElementById("porteføljeContainer");
    const addPortfolioForm = document.getElementById("addPortfolioForm");

    container.innerHTML = '';
    addPortfolioForm.innerHTML = '';
}





// Yderligere event listeners kan tilføjes her for Ydelser og Company sektionerne
// ...

// Husk at tilføje tilsvarende logik og event listeners for Ydelser og Company sektionerne


