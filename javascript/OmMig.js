
import {
    callNavbarTemplate,
    callFooterTemplate,
    changeToKontakt,
    changeToForside,
    changeToYdelser,
    changeToPortefolje,
    changeToOmMig,
    callCompanyInformation
} from "./template.js";

let aboutInformation = null;

document.addEventListener("DOMContentLoaded", function () {
    callNavbarTemplate();
    callFooterTemplate();
    fetchData();
    callCompanyInformation(); // Ensure this is called after the templates are loaded
});

async function fetchData() {
    try {
        const response = await fetch(globalURL+"/company")

        const data = await response.json();
        if (response.ok) {
            aboutInformation = data;

            // Now you can access elements safely because the DOM has fully loaded
            let title = document.getElementById("title");
            let description = document.getElementById("description");
            var formattedText = data.company_Description.replace(/\n\n/g, '<p></p><br>');

            title.innerHTML = data.company_Title;

            description.innerHTML = formattedText;
        } else {
            console.log("Could not fetch data");
        }
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}


