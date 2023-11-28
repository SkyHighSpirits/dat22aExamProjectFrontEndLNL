import { callNavbarTemplate, callFooterTemplate } from "./template.js";

let aboutInformation = null;

document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate();
    callFooterTemplate();
    fetchData();


});

async function fetchData() {
    try {
        const response = await fetch("http://localhost:8080/company")

        const data = await response.json();
        if (response.ok)
        {
            aboutInformation = data;
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


