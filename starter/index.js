const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

const promptManager = async () => {
    const { name, id, email, officeNumber } = await inquirer.prompt([
        {
            type: "input",
            message: "Enter manager's name:",
            name: "name"
        },
        {
            type: "input",
            message: "Enter manager's ID:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter manager's email:",
            name: "email"
        },
        {
            type: "input",
            message: "Enter manager's office number:",
            name: "officeNumber"
        }
    ]);
    const manager = new Manager(name, id, email, officeNumber);
    team.push(manager);
    console.log("Manager added to the team:", manager);
    console.log("Current team:", team);
};

const promptEmployee = async () => {
    const { userChoice } = await inquirer.prompt([
        {
            type: "list",
            message: "Who would you like to add to the team?",
            name: "userChoice",
            choices: ["Add an Engineer", "Add an Intern", "Finish building the team"]
        }
    ]);
    if (userChoice === "Engineer") {
        await promptEngineer();
    } else if (userChoice === "Intern") {
        await promptIntern();
    } else {
        generateHTML();
    }
};

// init() function is responsible for initializing the program
const init = async () => {
    console.log("Please enter manager details:");
    await promptManager();
    await promptEmployee();
};

init();