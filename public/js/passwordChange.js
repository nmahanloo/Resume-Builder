// Get username from localStorage
let username = localStorage.getItem("username");
//alert("localStorage: " + username);

// Pass username value to the passwordChange.ejs
document.querySelector("#passChangeForm").innerHTML += `<input id="usernameValue" name="usernameValue" type="hidden" value='${username}'>`;
document.querySelector("#cancelLink").innerHTML += `<a id="dashboardLink" href="/dashboard?username=${username}">Cancel</a>`;