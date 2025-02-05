/* editResume.js Unable to properly implement the JS for editResume before the deadline. 
//------------------------------------
// Variables and Constants
//------------------------------------
let username = localStorage.getItem("username");
let debounceTimeout;

const sections = {
  generalInformation: "General Information",
  educationalInformation: "Education",
  certificationInformation: "Certifications",
  skillInformation: "Skills",
  experienceInformation: "Experience",
  objectiveInformation: "Objective",
  saveInformation: "Save Resume",
};

//------------------------------------
// API Calls
//------------------------------------
async function getLocation(zipcodeFieldId) {
  const LOCATION_API_KEY = "256b7ab6af7d43cf82a14f9b96f68224";
  let zipCode = document.querySelector(`#${zipcodeFieldId}`).value;
  let url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${zipCode}&format=json&apiKey=${LOCATION_API_KEY}`;
  let response = await fetch(url);
  let data = await response.json();
  if (data.results && data.results.length > 0) {
    document.querySelector(`#${zipcodeFieldId}`).style.border = "";
    document.querySelector(`#${zipcodeFieldId}Error`).innerHTML = "";
    document.querySelector(`#${zipcodeFieldId}Error`).style.color = "";
    document.querySelector(
      `#${zipcodeFieldId.replace("zipcode", "city")}`,
    ).value = data.results[0].city;
    document.querySelector(
      `#${zipcodeFieldId.replace("zipcode", "state")}`,
    ).value = data.results[0].state;
    document.querySelector(
      `#${zipcodeFieldId.replace("zipcode", "country")}`,
    ).value = data.results[0].country;
  } else {
    document.querySelector(`#${zipcodeFieldId}`).style.border = "1px solid red";
    document.querySelector(`#${zipcodeFieldId}Error`).innerHTML =
      '<div class="errorZip"><br>Zip code not found</div>';
    document.querySelector(`#${zipcodeFieldId}Error`).style.color = "red";
  }
}

document.querySelectorAll(".next-btn").forEach((button) => {
  button.addEventListener("click", function (event) {
    // Prevent the default form submission event
    event.preventDefault();

    const currentSection = this.closest(".form-section");
    const targetSectionId = this.dataset.next;
    const targetSection = document.getElementById(targetSectionId);

    // Delay the section change until the search results are gone
    setTimeout(() => {
      updateBreadcrumb(targetSectionId);

      currentSection.classList.add("hidden");
      targetSection.classList.remove("hidden");
    }, 600);
  });
});

document.querySelectorAll(".prev-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const currentSection = this.closest(".form-section");
    const targetSectionId = this.dataset.previous;
    const targetSection = document.getElementById(targetSectionId);

    updateBreadcrumb(targetSectionId);

    currentSection.classList.add("hidden");
    targetSection.classList.remove("hidden");
  });
});

function updateBreadcrumb(sectionId) {
  // Get the breadcrumb element
  const breadcrumb = document.getElementById('breadcrumb');

  // Check if the breadcrumb element exists
  if (breadcrumb) {
    // Update the breadcrumb's text content based on the sectionId
    breadcrumb.textContent = sections[sectionId] || '';
  }
}

//------------------------------------
// Page Load Event
//------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  updateBreadcrumb("generalInformation");

  ["zipcode", "zipcodeEdu", "zipcodeCert", "zipcodeExp"].forEach(
    (zipcodeFieldId) => {
      const zipcodeField = document.querySelector(`#${zipcodeFieldId}`);
      if (zipcodeField) {
        zipcodeField.value = "";
      }
    },
  );
});
*/