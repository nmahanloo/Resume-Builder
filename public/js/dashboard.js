// initial localStorage for resumeId
let resumeId = 0;
localStorage.setItem("resumeId", resumeId);
let username = document.querySelector("#usernameValue").value;
localStorage.setItem("username", username);

// Setup dashboard
setupDashboard();

// Listeners
let resumeRadios = document.querySelectorAll("input[name=resumeRadio]");
resumeRadios.forEach((resumeRadio) => {
  resumeRadio.addEventListener('change',displayOperations);
});
document.querySelector("#logout").addEventListener("click", () => {
  localStorage.clear();
});

// Hide resume operations
function setupDashboard() {
  var resumeOperations = document.querySelector("#resumeOperations");
  resumeOperations.style.display = "none";
}

// Show operaton links if a resume has already been selected
function displayOperations() {
  document.querySelector("#resumeOperations").innerHTML = "";
  if (document.querySelector("input[name=resumeRadio]:checked")) {
    resumeId = document.querySelector("input[name=resumeRadio]:checked").value;
    localStorage.setItem("resumeId", resumeId);
    resumeOperations.style.display = "block";
    document.querySelector("#resumeOperations").innerHTML += `<a name="displaySelected" id="displaySelected" href="/resume/display?resumeId=${resumeId}" target="_blank">Display</a>`;
    //document.querySelector("#resumeOperations").innerHTML += `<a name="editSelected" id="editSelected" href="/resume/edit?resumeId=${resumeId}">Edit</a>`;
    document.querySelector("#resumeOperations").innerHTML += `<a name="deleteSelected" id="deleteSelected" href="/resume/delete?resumeId=${resumeId}&username=${username}">Delete</a>`;
  }
}