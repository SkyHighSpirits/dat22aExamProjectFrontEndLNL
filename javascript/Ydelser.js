import { callNavbarTemplate, callFooterTemplate } from "./template.js";

let operationsData;

document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate()
    callFooterTemplate()
    fetchAllOperations()
    createOperations(operationsData)
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
        .then(data => {
            operationsData = data;
            console.log('Operations:', data);
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Error fetching data:', error);
        });
}

function createOperations(data) {
    data.forEach(item => {
        const operationsBox = document.createElement('div');
        operationsBox.classList.add('operation_box');

        const operationsTitle = document.createElement('div');
        operationsTitle.classList.add('operation_title');
        operationsTitle.textContent = item.operation.operation_name;
        operationsBox.appendChild(operationsTitle);

        const operationsDescription = document.createElement('div');
        operationsDescription.classList.add('operation_description');
        operationsDescription.textContent = item.operation.operation_description;
        operationsBox.appendChild(operationsDescription);

        // Assuming operationsContainer is already defined somewhere in your code
        operationsContainer.appendChild(operationsBox);
    });
}