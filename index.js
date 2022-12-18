// link to page creation
const generateHTML = require("./src/generateHTML");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");

const fs = require("fs");
const inquirer = require("inquirer");

// Array for team

const theTeamArray = [];

// Adds employee to team
const addTheEmployee = () => {
  console.log(`
    =================
    Adding employees to the team
    =================
    `);

  // Will ask to choose Employee role

  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please choose your employee's role",
        choices: ["Engineer"],
      },
      {
        type: "input",
        name: "name",
        message: "What's the name of the employee?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter an employee's name!");
            return false;
          }
        },
      },
      // Will ask for employee ID
      {
        type: "input",
        name: "id",
        message: "Please enter the employee's ID.",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please enter the employee's ID!");
            return false;
          } else {
            return true;
          }
        },
      },
      // Will ask for employees email
      {
        type: "input",
        name: "email",
        message: "Please enter the employee's email.",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            console.log("Please enter an email!");
            return false;
          }
        },
      },
      // Will ask for Username
      {
        type: "input",
        name: "github",
        message: "Please enter the employee's github username.",
        when: (input) => input.role === "Engineer",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the employee's github username!");
          }
        },
      },

      {
        type: "confirm",
        name: "confirmedTheEmployee",
        message: "Would you like to add more team members?",
        default: false,
      },
    ])
    .then((employeeData) => {
      // data for employee types

      let { name, id, email, role, github, school, confirmedTheEmployee } =
        employeeData;
      let employee;

      theTeamArray.push(employee);

      if (confirmedTheEmployee) {
        return addTheEmployee(theTeamArray);
      } else {
        return theTeamArray;
      }
    });
};

// The function is to generate HTML page file using file system
const writeFile = (data) => {
  fs.writeFile("./dist/index.html", data, (err) => {
    // if there is an error
    if (err) {
      console.log(err);
      return;
      // This is for when the profile has been created
    } else {
      console.log(
        "Your team profile has been successfully created! Please check out the index.html"
      );
    }
  });
};

//
//start of manager prompts
const addTheManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Who is the manager of this team?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the manager's name!");
            return false;
          }
        },
      },

      {
        type: "input",
        name: "id",
        message: "Please enter the manager's ID.",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please enter the manager's ID");
            return false;
          } else {
            return true;
          }
        },
      },

      {
        type: "input",

        name: "email",
        message: "Please enter the manager's email.",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            console.log("Please enter an email!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter the manager's office number",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please enter an office number!");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((managerInput) => {
      const { name, id, email, officeNumber } = managerInput;
      const manager = new Manager(name, id, email, officeNumber);

      thetheTeamArray.push(manager);
      console.log(manager);
    });
};

addTheManager()
  .then(addTheEmployee)
  .then((theTeamArray) => {
    return generateHTML(theTeamArray);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });
