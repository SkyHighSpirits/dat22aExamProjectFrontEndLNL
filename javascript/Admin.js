
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("showPortfolioOverviewBtn").style.display = "none";
    document.getElementById("showServicesOverviewBtn").style.display = "none";
    document.getElementById("showCompanyOverviewBtn").style.display = "none";
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

        fetch(globalURL+'/createPost', {
            method: 'POST',
            body: formdata
        })
            .then(response => {
                if (response.status === 200) {
                    alert("Portefølge opslaget blev tilføjet succesfuldt!")
                }
                else if(response.status === 401)
                {
                    alert("Wrong username or password! Try again")
                }
                else {
                    throw new Error('Error: ' + response.status);
                }
            })
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
    emptyPortfolioContainer();
});

document.getElementById('backFromPortfolioOverview').addEventListener('click', function() {
    console.log('Tilbage fra Portefølje Oversigt-knap klikket');
    document.getElementById('portfolioOverview').style.display = 'none';
});

// Visning af Tilføj Portefølje Formular
document.getElementById('addPortfolioBtn').addEventListener('click', function() {
    console.log('Tilføj Portefølje-knap klikket');
    emptyPortfolioContainer();
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
    window.location.reload();
});

// Visning af Tilføj Ydelse Formular
document.getElementById('addServiceBtn').addEventListener('click', function() {
    console.log('Tilføj Ydelse-knap klikket');
    emptyOperationsContainerAndForms();
    document.getElementById('addServiceForm').style.display = 'block';
    document.getElementById('backFromDeleteService').style.display = 'none'
    setButtonID('addServiceBtn')
});

document.getElementById('editServiceBtn').addEventListener('click', function () {
    console.log('Edit service knap klikket');
    setButtonID("editServiceBtn");
    openModal();
})

// Skjulning af Tilføj Ydelse Formular
document.getElementById('backFromAddService').addEventListener('click', function() {
    console.log('Tilbage fra Tilføj Ydelse-knap klikket');
    document.getElementById('addServiceForm').style.display = 'none';
    window.location.reload()
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
    window.location.reload();
});

// ------  COMPANY --------

// Visning og skjulning af Company Oversigt
document.getElementById('showCompanyOverviewBtn').addEventListener('click', function() {
    console.log('Oversigt-knap for Company klikket');
    document.getElementById('companyOverview').style.display = 'block';
    getCompanyInformation();
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
        emptyOperationsContainerAndForms()
        getAllOperations(username, password)
    }
    if(openBtn.id === 'editServiceBtn')
    {
        emptyOperationsContainerAndForms()
        getAllOperations(username, password);
    }
    if(openBtn.id === 'deletePortfolioBtn')
    {
        emptyPortfolioContainer()
        hentPorteføljeEmner(username, password)
    }
    if(openBtn.id === 'newPortfolioForm')
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
    const response = await fetch( globalURL+"/createOperation", {
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

    if (response.ok) {
          alert("Du tilføjede en ny Service succesfuldt!")
    }
    if (!response.ok) {
        alert("Der skete en fejl!")
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

async function deleteOperation(id, username, password) {
    const url = globalURL+`/deleteOperation?operation_id=${id}&username=${username}&password=${password}`;

    console.log(url)
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
                console.log(response)
                alert("Din service blev slettet succesfuldt!")
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

async function getAllOperations(username, password)
{
    await fetch(globalURL+`/getAllOperationsIfPassword?username=${username}&password=${password}`)
        .then(response => {
            console.log(response)
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
            console.log(data)
            if(openBtn.id === 'editServiceBtn')
            {
                fillOperationsforUpdate(data);
            }
            else if(openBtn.id === 'deleteServiceBtn')
            {
                fillOperationsforDelete(data);
            }
            else{
                console.log("the update or delete button was never pressed")
            }
            // Forbereder den næste side
        })
        .catch(error => console.error('Fejl ved hentning af poster:', error));
}

async function editOperation(id, username, password) {
    let operationName = document.getElementById("editServiceName").value;
    let operationDescription = document.getElementById("editServiceDescription").value;

    console.log(id + " is the editID")

    let operation = await getOperation(id); // Make sure to await the result of getOperation
    if (operation !== null) {
        const updateOperationURL = globalURL+`/editOperation?id=${id}`;

        const params = new URLSearchParams();
        params.append('operationName', operationName);
        params.append('operationDescription', operationDescription);
        params.append('username', username);
        params.append('password', password);

        await fetch(updateOperationURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        })
            .then(response => {
                if (response.ok) {
                    console.log("Update operation request was succesfull")
                    alert("Opdateringen af din service var succesfuld!")
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .catch(error => {
                // Handle any errors
                console.log(error);
            });
    }
}

async function getOperation(id) {
    const getOperationURL = globalURL+`/getOperation?id=${id}`;

    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(getOperationURL, fetchOptions);

        if (response.ok) {
            console.log("Operation data fetch successful");
            const data = await response.json();
            return data; // Return the data here
        } else {
            throw new Error('Error: ' + response.status);
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        // You might want to throw the error again or handle it appropriately based on your use case.
    }
}


async function deletePoster(id, username, password) {
    // API endpoint for deletePoster
    const url = globalURL+`/deletePoster?poster_id=${id}&username=${username}&password=${password}`;

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
                alert("Dit portefølge opslag blev slettet succesfuldt!")
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

async function getCompanyInformation() {
    try {
        const response = await fetch(globalURL+"/company")

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

    await fetch(globalURL+`/getPostsPwd?username=${username}&password=${password}`)
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
        deleteButton.innerText = "Slet";

        deleteButton.addEventListener('click', async function() {
                await deletePoster(id, username, password)
                emptyPortfolioContainer()
                await hentPorteføljeEmner(username, password)
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

function fillOperationsforUpdate(data) {
    data.forEach(item => {
        const operationsBox = document.createElement('div');
        operationsBox.classList.add('operation_box');

        const operationsTitle = document.createElement('div');
        operationsTitle.classList.add('operation_title');
        operationsTitle.textContent = item.operation_Name;
        operationsBox.appendChild(operationsTitle);

        const operationsDescription = document.createElement('div');
        operationsDescription.classList.add('operation_description');
        operationsDescription.textContent = item.operation_Desription;
        operationsBox.appendChild(operationsDescription);

        let updateButton = document.createElement('button');
        operationsBox.appendChild(updateButton);

        let id = item.operation_Id;

        console.log(id);
        updateButton.innerText = "Opdater";

        updateButton.addEventListener('click', function () {
            emptyOperationsContainer();
            document.getElementById('editServiceForm').style.display = 'block';

            let nameField = document.getElementById("editServiceName");
            let descriptionField = document.getElementById("editServiceDescription");
            // Use the 'value' property to set input field values
            nameField.value = item.operation_Name;
            descriptionField.value = item.operation_Desription;

            // Create submitEditedServiceBtn dynamically when updateButton is clicked
            let submitEditedServiceBtn = document.getElementById("submitEditedServiceBtn");

            submitEditedServiceBtn.addEventListener('click', async function () {
                try {
                    console.log(username, password);
                    await editOperation(id, username, password);
                    await emptyServiceForms();
                    await getAllOperations(username, password);
                } catch (error) {
                    console.error("Error editing operation:", error);
                }
            });
        });

        // Assuming operationsContainer is already defined somewhere in your code
        operationsContainer.appendChild(operationsBox);
    });
}

async function fillOperationsforDelete(data) {
    const operationsContainer = document.getElementById('operationsContainer');

    for (const item of data) {
        const operationsBox = document.createElement('div');
        operationsBox.classList.add('operation_box');

        const operationsTitle = document.createElement('div');
        operationsTitle.classList.add('operation_title');
        operationsTitle.textContent = item.operation_Name;
        operationsBox.appendChild(operationsTitle);

        const operationsDescription = document.createElement('div');
        operationsDescription.classList.add('operation_description');
        operationsDescription.textContent = item.operation_Desription;
        operationsBox.appendChild(operationsDescription);

        let deleteButton = document.createElement('button');
        operationsBox.appendChild(deleteButton);

        let id = item.operation_Id;

        console.log(id);
        deleteButton.innerText = "Slet";

        deleteButton.addEventListener('click', async function() {
            try {
                await deleteOperation(id, username, password);

                emptyOperationsContainerAndForms();

                await getAllOperations(username, password);
            } catch (error) {
                console.error("Error deleting operation:", error);
            }
        });

        operationsContainer.appendChild(operationsBox);
    }
}

function emptyPortfolioContainer() {
    const container = document.getElementById("porteføljeContainer");
    document.getElementById("addPortfolioForm").style.display = 'none';

    container.innerHTML = '';
}

function emptyOperationsContainerAndForms()
{
    const container = document.getElementById("operationsContainer");
    document.getElementById("editServiceForm").style.display = 'none';
    document.getElementById('addServiceForm').style.display = 'none';

    container.innerHTML = '';
}

function emptyOperationsContainer()
{
    const container = document.getElementById("operationsContainer");

    container.innerHTML = '';
}

function emptyServiceForms()
{
    document.getElementById("editServiceForm").style.display = 'none';
    document.getElementById('addServiceForm').style.display = 'none';
}





// Yderligere event listeners kan tilføjes her for Ydelser og Company sektionerne
// ...

// Husk at tilføje tilsvarende logik og event listeners for Ydelser og Company sektionerne


