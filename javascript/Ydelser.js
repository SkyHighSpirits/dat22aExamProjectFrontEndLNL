import { callNavbarTemplate, callFooterTemplate } from "./template.js";

let operationsData;

document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate()
    callFooterTemplate()
    fetchAllOperations()
});

let operationsContainer = document.getElementById('operations_container');

// Ingen yderligere kode er nødvendig her for navigation, da det håndteres i template.js

async function fetchAllOperations()
{
    await fetch('http://localhost:8080/getAllOperations')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(async data => {
            await console.log(data)
            await createOperations(data)
            console.log('Operations:', data);
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Error fetching data:', error);
        });
}

async function createOperations(data) {
    await data.forEach(item => {
        const operationsBox = document.createElement('div');
        operationsBox.classList.add('operation_box');

        const operationsTitleBox = document.createElement('div');
        const operationsTitle = document.createElement('p');
        operationsTitleBox.classList.add('operation_title_box');
        operationsTitle.classList.add('operation_title');
        operationsTitle.textContent = item.operation_Name;
        operationsBox.appendChild(operationsTitleBox)
        operationsTitleBox.appendChild(operationsTitle);

        const operationsDescriptionBox = document.createElement('div');
        const operationsDescription = document.createElement('p');
        operationsDescriptionBox.classList.add('operation_description_box');
        operationsDescription.classList.add('operation_description');
        operationsDescription.textContent = item.operation_Desription;
        operationsBox.appendChild(operationsDescriptionBox);
        operationsDescriptionBox.appendChild(operationsDescription)

        const operationContactBtn = document.createElement('button')
        const operationContactBtnBox = document.createElement('div')
        operationContactBtn.textContent = "Få et tilbud";
        operationContactBtnBox.classList = "operation_contact_btn_box"
        operationContactBtn.classList = "operation_contact_btn"
        operationsBox.appendChild(operationContactBtnBox)
        operationContactBtnBox.appendChild(operationContactBtn)
        operationContactBtn.addEventListener('click', function()
        {
            // Assuming you have two variables: var1 and var2
            var name = item.operation_Name;
            var description = item.operation_Desription;

            // Construct the query string
            var queryString = `?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}`;

            // Change the page with the constructed query string
            window.location.href = 'KontaktPage.html' + queryString;

        })

        // Assuming operationsContainer is already defined somewhere in your code
        operationsContainer.appendChild(operationsBox);
    });
}