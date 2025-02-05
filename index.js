// Initializing Express
const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = require("./dbPool");
const bcrypt = require("bcrypt");
const session = require("express-session");
app.set("view engine", "ejs");
app.use(express.static("public"));
//const bodyParser=require("body-parser");
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "CST336",
    resave: false,
    saveUninitialized: true,
  }),
);

//---------------------------------------------------//
//                   Login Page                      //
//---------------------------------------------------//
app.get("/", async (req, res) => {
  let message = "";
  res.render("login", { message: message });
});

app.post("/", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username.length < 1) {
    res.render("login", { message: "Enter username!" });
    return;
  }
  if (password.length < 1) {
    res.render("login", { message: "Enter password!" });
    return;
  }
  let passwordHash = "";
  let sql = `SELECT * FROM user WHERE username = ?`;
  let rows = await executeSQL(sql, [username]);
  if (rows.length > 0) {
    passwordHash = rows[0].password;
    //console.log(passwordHash);
  }
  let passwordMatch = await bcrypt.compare(password, passwordHash);
  if (passwordMatch) {
    req.session.username = username;
    let sql = `SELECT * FROM resume where username = ? ORDER BY date DESC`;
    let resumes = await executeSQL(sql, [username]);
    for (let i = 0; i < resumes.length; i++) {
      resumes[i].date = resumes[i].date.toDateString();
      resumes[i].date = resumes[i].date.substring(4);
    }
    req.session.authenticated = true;
    res.render("dashboard", {
      username: username,
      resumes: resumes,
      message: "",
    });
  } else {
    res.render("login", { message: "Invalid username and/or password!" });
  }
});

//---------------------------------------------------//
//                   Signup Page                     //
//---------------------------------------------------//
app.get("/signup", async (req, res) => {
  let message = "";
  res.render("signup", message);
});

app.post("/signup", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let passwordConfirm = req.body.passwordConfirm;
  let passNum = false;
  let passUpper = false;
  let passLower = false;
  let passSpecial = false;
  for (let index = 0; index < password.length; index++) {
    if (
      (password.charCodeAt(index) > 32 && password.charCodeAt(index) < 48) ||
      (password.charCodeAt(index) > 57 && password.charCodeAt(index) < 65) ||
      (password.charCodeAt(index) > 90 && password.charCodeAt(index) < 97) ||
      (password.charCodeAt(index) > 122 && password.charCodeAt(index) < 127)
    ) {
      passSpecial = true;
    }
    if (password.charCodeAt(index) > 47 && password.charCodeAt(index) < 58) {
      passNum = true;
    }
    if (password.charCodeAt(index) > 64 && password.charCodeAt(index) < 91) {
      passUpper = true;
    }
    if (password.charCodeAt(index) > 96 && password.charCodeAt(index) < 123) {
      passLower = true;
    }
  }
  if (username.length < 1) {
    res.render("signup", { message: "Enter username!" });
    return;
  }
  let sql = `SELECT * FROM user WHERE username = ?`;
  let rows = await executeSQL(sql, [username]);
  if (rows.length > 0) {
    res.render("signup", { message: "Username already exists!" });
    return;
  } else if (passwordConfirm != password) {
    res.render("signup", { message: "Password is not match!" });
    return;
  } else if (password.length < 6 || password.length > 30) {
    res.render("signup", {
      message:
        "Password must be at least 6 characters and less than 30 characters!",
    });
    return;
  } else if (!passLower || !passUpper || !passNum || !passSpecial) {
    res.render("signup", {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character!",
    });
    return;
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);
    sql = `INSERT INTO user (username, password) VALUES (?, ?)`;
    rows = await executeSQL(sql, [username, hashedPassword]);
    res.render("login", { message: "User created successfully!" });
  }
});

//---------------------------------------------------//
//               User Dashboard Page                 //
//---------------------------------------------------//
app.get("/dashboard", async (req, res) => {
  let username = req.session.username;
  if (!username) {
    res.redirect("/");
  }
  //console.log("dashboard username: " + username);
  let message = "";
  let sql = `SELECT * FROM resume where username = ? ORDER BY date DESC`;
  let resumes = await executeSQL(sql, [username]);
  for (let i = 0; i < resumes.length; i++) {
    resumes[i].date = resumes[i].date.toDateString();
    resumes[i].date = resumes[i].date.substring(4);
  }
  //console.log("Resumes: " + resumes);
  res.render("dashboard", {
    username: username,
    resumes: resumes,
    message: message,
  });
});

app.post("/dashboard", async (req, res) => {
  let message = "";
  res.render("dashboard", { message: message });
});

//---------------------------------------------------//
//              Change Password Page                 //
//---------------------------------------------------//
app.get("/passwordChange", async (req, res) => {
  let username = req.session.username;
  if (!username) {
    res.redirect("/");
  } else {
    let message = "";
    res.render("passwordChange", { message: message });
  }
});

app.post("/passwordChange", async (req, res) => {
  let username = req.body.usernameValue;
  //console.log("username: " + username);
  let currentPassword = req.body.currentPassword;
  let password = req.body.password;
  let passwordConfirm = req.body.passwordConfirm;
  let passNum = false;
  let passUpper = false;
  let passLower = false;
  let passSpecial = false;
  for (let index = 0; index < password.length; index++) {
    if (
      (password.charCodeAt(index) > 32 && password.charCodeAt(index) < 48) ||
      (password.charCodeAt(index) > 57 && password.charCodeAt(index) < 65) ||
      (password.charCodeAt(index) > 90 && password.charCodeAt(index) < 97) ||
      (password.charCodeAt(index) > 122 && password.charCodeAt(index) < 127)
    ) {
      passSpecial = true;
    }
    if (password.charCodeAt(index) > 47 && password.charCodeAt(index) < 58) {
      passNum = true;
    }
    if (password.charCodeAt(index) > 64 && password.charCodeAt(index) < 91) {
      passUpper = true;
    }
    if (password.charCodeAt(index) > 96 && password.charCodeAt(index) < 123) {
      passLower = true;
    }
  }
  if (currentPassword.length < 1) {
    res.render("passwordChange", { message: "Enter current password!" });
    return;
  } else if (password.length < 1) {
    res.render("passwordChange", { message: "Enter new password!" });
    return;
  } else if (password.length < 6 || password.length > 30) {
    res.render("passwordChange", {
      message:
        "New password must be at least 6 characters and less than 30 characters",
    });
  } else if (!passLower || !passUpper || !passNum || !passSpecial) {
    res.render("passwordChange", {
      message:
        "New password must contain at least one lowercase letter, one uppercase letter, one number, and one special character!",
    });
    return;
  } else if (password != passwordConfirm) {
    res.render("passwordChange", { message: "New password is not match!" });
    return;
  }
  let passwordHash = "";
  let sql = `SELECT * FROM user WHERE username = ?`;
  let rows = await executeSQL(sql, [username]);
  if (rows.length > 0) {
    passwordHash = rows[0].password;
    //console.log(passwordHash);
  }
  let passwordMatch = await bcrypt.compare(password, passwordHash);
  if (passwordMatch) {
    res.render("passwordChange", {
      message: "New password is same as the current password!",
    });
    return;
  }
  passwordMatch = false;
  passwordMatch = await bcrypt.compare(currentPassword, passwordHash);
  if (passwordMatch) {
    let sql = `SELECT * FROM resume where username = ? ORDER BY date DESC`;
    let resumes = await executeSQL(sql, [username]);
    for (let i = 0; i < resumes.length; i++) {
      resumes[i].date = resumes[i].date.toDateString();
      resumes[i].date = resumes[i].date.substring(4);
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    sql = `UPDATE user SET password = ? WHERE username = ?`;
    rows = await executeSQL(sql, [hashedPassword, username]);
    res.render("dashboard", {
      username: username,
      resumes: resumes,
      message: "",
    });
  } else {
    res.render("passwordChange", { message: "Current password is invalid!" });
  }
});

//---------------------------------------------------//
//                 Create Resume Page                //
//---------------------------------------------------//
app.get("/resume/add", async (req, res) => {
  let username = req.session.username;
  if (!username) {
    res.redirect("/");
  } else {
    res.render("addResume", {
      username: username,
      message: "",
    });
  }
});

app.post("/resume/add", async (req, res) => {
  let resumeData = req.body;
  try {
    // Insert general information into the 'resume' table
    let mainSql = `INSERT INTO resume (username, date, resumeName, firstName, lastName, city, state, country, phone, email, linkedin, github, other, objective) VALUES (?, CURDATE(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let mainParams = [
      req.session.username,
      resumeData.resumeName,
      resumeData.firstName,
      resumeData.lastName,
      resumeData.city,
      resumeData.state,
      resumeData.country,
      resumeData.phone,
      resumeData.email,
      resumeData.linkedin,
      resumeData.github,
      resumeData.personalWebsite,
      resumeData.careerObjective,
    ];
    let mainRows = await executeSQL(mainSql, mainParams);
    let resumeId = mainRows.insertId;

    // Insert educational information into the 'education' table
    let eduSql = `INSERT INTO education (resumeId, name, city, state, country, degree, major, start, grad, gpa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let eduParams = [
      resumeId,
      resumeData.instituteNameEdu,
      resumeData.cityEdu,
      resumeData.stateEdu,
      resumeData.countryEdu,
      resumeData.degreeEdu,
      resumeData.majorEdu,
      resumeData.dateAttendedEdu,
      resumeData.dateGraduatedEdu,
      resumeData.gpaEdu,
    ];
    let eduRows = await executeSQL(eduSql, eduParams);

    // Insert certification information into the 'certificate' table
    let certSql = `INSERT INTO certificate (resumeId, name, city, state, country, certificate, earn, expire) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    let certParams = [
      resumeId,
      resumeData.instituteNameCert,
      resumeData.cityCert,
      resumeData.stateCert,
      resumeData.countryCert,
      resumeData.certificate,
      resumeData.dateCert,
      resumeData.expireCert,
    ];
    let certRows = await executeSQL(certSql, certParams);

    let skillSql = `INSERT INTO skill (resumeId, skill) VALUES (?, ?)`;
    for (let skill of req.body.skills) {
      let skillParams = [resumeId, skill];
      await executeSQL(skillSql, skillParams);
    }

    // Insert experience information into the 'experience' table
    let expSql = `INSERT INTO experience (resumeId, employer, city, state, country, position, start, end, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let expParams = [
      resumeId,
      resumeData.employer,
      resumeData.cityExp,
      resumeData.stateExp,
      resumeData.countryExp,
      resumeData.position,
      resumeData.startDate,
      resumeData.endDate,
      resumeData.description,
    ];
    let expRows = await executeSQL(expSql, expParams);

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error adding resume:", error);
    res.render("addResume", {
      message: "Error adding resume. Please try again.",
    });
  }
});

//---------------------------------------------------//
//               Edit Resume Page                    //
//---------------------------------------------------//
/* Unable to implement the editResume route before the deadline 
app.get("/resume/edit", async (req, res) => {
  let resumeId = req.query.resumeId;
  let username = req.session.username;
  if (!username) {
    res.redirect("/");
  } else {
    res.render("addResume", {
      username: username,
      message: "",
    });
  }
  let sql = "SELECT * FROM resume WHERE resumeId = ?";
  let resume = await executeSQL(sql, [resumeId]);
  sql = "SELECT * FROM education WHERE resumeId = ?";
  let educations = await executeSQL(sql, [resumeId]);
  sql = "SELECT * FROM certificate WHERE resumeId = ?";
  let certificates = await executeSQL(sql, [resumeId]);
  sql = "SELECT * FROM skill WHERE resumeId = ?";
  let skills = await executeSQL(sql, [resumeId]);
  sql = "SELECT * FROM experience WHERE resumeId = ?";
  let experiences = await executeSQL(sql, [resumeId]);
  res.render("editResume", { 'resumeId': resumeId, 'resume': resume, 'educations': educations, 'certificates': certificates, 'skills': skills, 'experiences': experiences}); // Pass resumeId to the template
});

app.post("/resume/edit", async (req, res) => {
  let resumeData = req.body;
  let resumeId = req.body.resumeId;
  try {
    // Edit general information of the 'resume' table
    let mainSql = `UPDATE resume SET (date = CURDATE(), resumeName = ?, firstName = ?, lastName = ?, city = ?, state = ?, country = ?, phone = ?, email = ?, linkedin = ?, github = ?, other = ?, objective = ?) WHERE resumeId = ?`;
    let mainParams = [
      req.session.username,
      resumeData.resumeName,
      resumeData.firstName,
      resumeData.lastName,
      resumeData.city,
      resumeData.state,
      resumeData.country,
      resumeData.phone,
      resumeData.email,
      resumeData.linkedin,
      resumeData.github,
      resumeData.personalWebsite,
      resumeData.careerObjective,
      resumeId
    ];
    let mainRows = await executeSQL(mainSql, mainParams);

    // Edit educational information of the 'education' table
    let eduSql = `DELETE FROM education WHERE resumeId = ?`;
    let eduRows = await executeSQL(eduSql, [resumeId]);
    eduSql = `INSERT INTO education (resumeId, name, city, state, country, degree, major, start, grad, gpa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let eduParams = [
      resumeId,
      resumeData.instituteNameEdu,
      resumeData.cityEdu,
      resumeData.stateEdu,
      resumeData.countryEdu,
      resumeData.degreeEdu,
      resumeData.majorEdu,
      resumeData.dateAttendedEdu,
      resumeData.dateGraduatedEdu,
      resumeData.gpaEdu,
    ];
    eduRows = await executeSQL(eduSql, eduParams);

    // Edit certification information of the 'certificate' table
    let certSql = `DELETE FROM certificate WHERE resumeId = ?`;
    let certRows = await executeSQL(certSql, [resumeId]);
    certSql = `INSERT INTO certificate (resumeId, name, city, state, country, certificate, earn, expire) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    let certParams = [
      resumeId,
      resumeData.instituteNameCert,
      resumeData.cityCert,
      resumeData.stateCert,
      resumeData.countryCert,
      resumeData.certificate,
      resumeData.dateCert,
      resumeData.expireCert,
    ];
    certRows = await executeSQL(certSql, certParams);

    
    // Update Skills information of the 'skill' table
    let skillSql = `DELETE FROM skill WHERE resumeId = ?`;
    let skillRows = await executeSQL(skillSql, [resumeId]);
    skillSql = `INSERT INTO skill (resumeId, skill) VALUES (?, ?)`;
    for (let skill of req.body.skills) {
      let skillParams = [resumeId, skill];
      await executeSQL(skillSql, skillParams);
    }

    // Update experience information of the 'experience' table
    let expSql = `DELETE FROM experience WHERE resumeId = ?`;
    let expRows = await executeSQL(expSql, expParams);
    expSql = `INSERT INTO experience (resumeId, employer, city, state, country, position, start, end, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let expParams = [
      resumeId,
      resumeData.employer,
      resumeData.cityExp,
      resumeData.stateExp,
      resumeData.countryExp,
      resumeData.position,
      resumeData.startDate,
      resumeData.endDate,
      resumeData.description,
    ];
    expRows = await executeSQL(expSql, expParams);

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error adding resume:", error);
    res.render("addResume", {
      message: "Error adding resume. Please try again.",
    });
  }
});
*/


//---------------------------------------------------//
//                Display Resume Page                //
//---------------------------------------------------//
app.get("/resume/display", async (req, res) => {
  let resumeId = req.query.resumeId;
  let sql = `SELECT * FROM resume WHERE resumeId = ?`;
  let general = await executeSQL(sql, [resumeId]);
  let phone = general[0].phone.toString();
  phone =
    "(" +
    phone.substring(0, 3) +
    ") " +
    phone.substring(3, 6) +
    "-" +
    phone.substring(6, 10);
  sql = `SELECT * FROM education WHERE resumeId = ?`;
  let educations = await executeSQL(sql, [resumeId]);
  for (let i = 0; i < educations.length; i++) {
    if (educations[i].start != null) {
      educations[i].start = educations[i].start.toDateString();
      educations[i].start = educations[i].start.substring(4);
    }
    if (educations[i].grad != null) {
      educations[i].grad = educations[i].grad.toDateString();
      educations[i].grad = educations[i].grad.substring(4);
    }
  }
  sql = `SELECT * FROM certificate WHERE resumeId = ?`;
  let certificates = await executeSQL(sql, [resumeId]);
  for (let i = 0; i < certificates.length; i++) {
    if (certificates[i].earn != null) {
      certificates[i].earn = certificates[i].earn.toDateString();
      certificates[i].earn = certificates[i].earn.substring(4);
    }
    if (certificates[i].expire != null) {
      certificates[i].expire = certificates[i].expire.toDateString();
      certificates[i].expire = certificates[i].expire.substring(4);
    }
  }
  sql = `SELECT * FROM skill WHERE resumeId = ?`;
  let skills = await executeSQL(sql, [resumeId]);
  sql = `SELECT * FROM experience WHERE resumeId = ?`;
  let experiences = await executeSQL(sql, [resumeId]);
  for (let i = 0; i < experiences.length; i++) {
    if (experiences[i].start != null) {
      experiences[i].start = experiences[i].start.toDateString();
      experiences[i].start = experiences[i].start.substring(4);
    }
    if (experiences[i].end != null) {
      experiences[i].end = experiences[i].end.toDateString();
      experiences[i].end = experiences[i].end.substring(4);
    }
  }
  res.render("displayResume", {
    general: general,
    phone: phone,
    educations: educations,
    certificates: certificates,
    skills: skills,
    experiences: experiences,
  });
});

app.post("/resume/display", async (req, res) => {
  res.render("displayResume");
});

//---------------------------------------------------//
//              Delete a Resume                      //
//---------------------------------------------------//
app.get("/resume/delete", async (req, res) => {
  let resumeId = req.query.resumeId;
  let username = req.query.username;
  let sql = `DELETE 
             FROM education 
             WHERE resumeId = ${resumeId}`;
  let rows = await executeSQL(sql);
  sql = `DELETE 
         FROM certificate 
         WHERE resumeId = ${resumeId}`;
  rows = await executeSQL(sql);
  sql = `DELETE 
         FROM skill 
         WHERE resumeId = ${resumeId}`;
  rows = await executeSQL(sql);
  sql = `DELETE 
         FROM experience 
         WHERE resumeId = ${resumeId}`;
  rows = await executeSQL(sql);
  sql = `DELETE 
         FROM resume 
         WHERE resumeId = ${resumeId}`;
  rows = await executeSQL(sql);
  res.redirect(`/dashboard?username=${username}`);
});

//---------------------------------------------------//
//                     Logout                        //
//---------------------------------------------------//
app.get("/sessionDestroy", async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//---------------------------------------------------//
//                Test Database                      //
//---------------------------------------------------//
app.get("/dbTest", async function (req, res) {
  let sql = "SELECT CURDATE()";
  let rows = await executeSQL(sql);
  res.send(rows);
}); // dbTest

//---------------------------------------------------//
//                  Functions                        //
//---------------------------------------------------//
async function executeSQL(sql, params) {
  return new Promise(function (resolve, reject) {
    pool.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    });
  });
} // executeSQL

//---------------------------------------------------//
//                  Start Server                     //
//---------------------------------------------------//
app.listen(3000, () => {
  console.log("Expresss server running...");
});
