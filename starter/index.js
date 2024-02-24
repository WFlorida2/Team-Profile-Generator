const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./src/page-template.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

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
    if (userChoice === "Add an Engineer") {
        await promptEngineer();
    } else if (userChoice === "Add an Intern") {
        await promptIntern();
    }
};

const promptEngineer = async () => {
    const { name, id, email, github } = await inquirer.prompt([
        {
            type: "input",
            message: "Enter engineer's name:",
            name: "name"
        },
        {
            type: "input",
            message: "Enter engineer's ID:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter engineer's email:",
            name: "email"
        },
        {
            type: "input",
            message: "Enter engineer's GitHub username:",
            name: "github"
        }
    ]);
    const engineer = new Engineer(name, id, email, github);
    team.push(engineer);
    console.log("Engineer added to the team:", engineer);
    console.log("Current team:", team);
};

const promptIntern = async () => {
    const { name, id, email, school } = await inquirer.prompt([
        {
            type: "input",
            message: "Enter intern's name:",
            name: "name"
        },
        {
            type: "input",
            message: "Enter intern's ID:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter intern's email:",
            name: "email"
        },
        {
            type: "input",
            message: "Enter intern's school:",
            name: "school"
        }
    ]);
    const intern = new Intern(name, id, email, school);
    team.push(intern);
    console.log("Intern added to the team:", intern);
    console.log("Current team:", team);
};

const generateHTML = () => {
    console.log("Output directory path:", OUTPUT_DIR);
    console.log("Checking if output directory exists...");
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
        console.log("Output directory created at", OUTPUT_DIR);
    } else {
        console.log("Output directory already exists at", OUTPUT_DIR);
    }

    console.log("Writing HTML file to path:", outputPath);
    console.log("Attempting to write HTML file...");

    // Generate HTML for the entire team
    const html = render(team);

    // Write HTML content to file
    fs.writeFileSync(outputPath, html, "utf-8");

    console.log("Team HTML generated at", outputPath);
    console.log("Checking if HTML file exists after write attempt:", fs.existsSync(outputPath));

    console.log("Contents of output directory:", fs.readdirSync(OUTPUT_DIR));
};

const init = async () => {
    console.log("Please enter manager details:");
    await promptManager();
    
    let finishBuilding = false;
    while (!finishBuilding) {
        await promptEmployee();
        const { userChoice } = await inquirer.prompt([
            {
                type: "list",
                message: "Would you like to add another team member or finish building the team?",
                name: "userChoice",
                choices: ["Add another team member", "Finish building the team"]
            }
        ]);
        if (userChoice === "Finish building the team") {
            finishBuilding = true;
        }
    }

    generateHTML(); // Call generateHTML() after the user has finished building the team
};

init();

