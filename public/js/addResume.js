//------------------------------------
// Variables and Constants
//------------------------------------
let username = localStorage.getItem("username");
let hasChecked = false;
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
    if (data.results && data.results.length > 0){
      document.querySelector(`#${zipcodeFieldId}`).style.border = "";
      document.querySelector(`#${zipcodeFieldId}Error`).innerHTML = "";
      document.querySelector(`#${zipcodeFieldId}Error`).style.color = "";
      document.querySelector(`#${zipcodeFieldId.replace("zipcode", "city")}`).value = data.results[0].city;
      document.querySelector(`#${zipcodeFieldId.replace("zipcode", "state")}`).value = data.results[0].state;
      document.querySelector(`#${zipcodeFieldId.replace("zipcode", "country")}`).value = data.results[0].country;
    } else {
      document.querySelector(`#${zipcodeFieldId}`).style.border = "1px solid red";
      document.querySelector(`#${zipcodeFieldId}Error`).innerHTML = '<div class="errorZip"><br>Zip code not found</div>';
      document.querySelector(`#${zipcodeFieldId}Error`).style.color = "red";
    }
  }

function displaySkillResults(data) {
  const skillResults = document.getElementById("skillResults");
  skillResults.innerHTML = ""; // Clear previous results
  data.forEach((skill) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = skill;
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        addSkill(skill);
      } else {
        removeSkill(skill);
      }
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(skill));
    skillResults.appendChild(label);
  });
}

//------------------------------------
// DOM Manipulation Functions
//------------------------------------
function updateBreadcrumb(currentSectionId) {
  const breadcrumbContainer = document.getElementById("breadcrumb");
  breadcrumbContainer.innerHTML = ""; // Clear existing breadcrumbs

  const sections = {
    generalInformation: "General Information",
    educationalInformation: "Education",
    certificationInformation: "Certifications",
    skillInformation: "Skills",
    experienceInformation: "Experience",
    objectiveInformation: "Objective",
    saveInformation: "Save Resume",
  };

  let foundCurrent = false;

  for (const sectionId in sections) {
    if (!foundCurrent) {
      const span = document.createElement("span");

      if (sectionId === currentSectionId) {
        span.textContent = sections[sectionId];
        span.classList.add("current");
        breadcrumbContainer.appendChild(span);
        foundCurrent = true;
      } else {
        const anchor = document.createElement("a");
        anchor.href = `#${sectionId}`;
        anchor.classList.add("breadcrumb-link");
        anchor.textContent = sections[sectionId];
        breadcrumbContainer.appendChild(anchor);
      }
      breadcrumbContainer.appendChild(document.createElement("br"));
    }
  }

  // Attach event listeners
  document.querySelectorAll(".breadcrumb-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetSectionId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetSectionId);

      document.querySelectorAll(".form-section").forEach((section) => {
        section.classList.add("hidden");
      });
      targetSection.classList.remove("hidden");

      updateBreadcrumb(targetSectionId);
    });
  });
}

function addSkill(skill) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "skills[]";
  checkbox.value = skill;
  checkbox.checked = true; 
  checkbox.id = `skill-${skill}`; 
  checkbox.addEventListener('change', function() {
    hasChecked = true; 
    validateSelectedSkills();
  }); // Add event listener

  const label = document.createElement("label");
  label.textContent = skill;
  label.htmlFor = checkbox.id;

  const div = document.createElement("div");
  div.appendChild(checkbox);
  div.appendChild(label);

  document.getElementById("selectedSkills").appendChild(div);
}

function validateSelectedSkills() {
  const checkboxes = document.getElementById('selectedSkills').querySelectorAll('input[type="checkbox"]');
  const allChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

  // If no checkbox is checked and a checkbox has been checked before, add a red border to the div
  if (!allChecked && hasChecked) {
    document.getElementById('selectedSkills').style.border = '1px solid red';
  } else {
    document.getElementById('selectedSkills').style.border = '';
  }
}

function validateSection(section) {
  if (section.id === 'skillInformation') {
    // Validate the skills section
    const checkboxes = document.getElementById('selectedSkills').querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    // If no checkbox is checked, add a red border to the div
    if (!allChecked) {
      document.getElementById('selectedSkills').style.border = '1px solid red';
    } else {
      document.getElementById('selectedSkills').style.border = '';
    }

    return allChecked;
  } else {
    // Validate other sections
    const inputs = section.querySelectorAll('input[required], textarea[required]');
    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        allFilled = false;
        input.classList.add('error'); 
      } else {
        input.classList.remove('error'); 
      }
    });

    return allFilled;
  }
}

validateSelectedSkills();

//------------------------------------
// Event Listeners
//------------------------------------
document.addEventListener('mousedown', function(event) {
  const skillSearch = document.getElementById('skillSearch');
  const skillResults = document.getElementById('skillResults');

  // Check if the clicked element is not skillSearch or skillResults
  if (!skillSearch.contains(event.target) && !skillResults.contains(event.target)) {
    // Clear the search box and results
    skillSearch.value = '';
    skillResults.innerHTML = '';
  }
});

["zipcode", "zipcodeEdu", "zipcodeCert", "zipcodeExp"].forEach((zipcodeFieldId) => {
  document.querySelector(`#${zipcodeFieldId}`).addEventListener("input", function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => getLocation(zipcodeFieldId), 500);
  });
});

document.getElementById("skillSearch").addEventListener("input", function () {
  const query = this.value;

  clearTimeout(debounceTimeout); 

  debounceTimeout = setTimeout(() => { 
    if (query.length > 2) { 
      let myHeaders = new Headers();
      myHeaders.append("apikey", "PPPqXLmzS4chlA7ZIArHZCO6Vw5A9sC9");

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://api.apilayer.com/skills?q=${query}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          displaySkillResults(data);
        })
        .catch((error) => {
          console.error("Error fetching skills:", error);
        });
    }
    else if (query.length === 0) {
      document.getElementById("skillResults").innerHTML = "";
    }
  }, 100); 
});

document.querySelectorAll(".next-btn").forEach((button) => {
  button.addEventListener("click", function (event) {
    const currentSection = this.closest(".form-section");

    if (!validateSection(currentSection)) {
      event.preventDefault();
      return;
    }

    // If the current section is the skills section, clear the search form and results
    if (currentSection.id === 'skillInformation') {
      document.getElementById('skillSearch').value = '';
      document.getElementById('skillResults').innerHTML = '';
    }

    const targetSectionId = this.dataset.next;
    const targetSection = document.getElementById(targetSectionId);

    // Error when search results are still present when clicking next
    // This is a temp fix
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

//------------------------------------
// Page Load Event
//------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  updateBreadcrumb("generalInformation");

  document.getElementById('skillSearch').value = '';

  ["zipcode", "zipcodeEdu", "zipcodeCert", "zipcodeExp"].forEach((zipcodeFieldId) => {
    const zipcodeField = document.querySelector(`#${zipcodeFieldId}`);
    if (zipcodeField) {
      zipcodeField.value = "";
    }
  });
});