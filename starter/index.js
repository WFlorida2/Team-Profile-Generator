// Required modules
const Manager = require("./lib/Manager"); // Import Manager class
const Engineer = require("./lib/Engineer"); // Import Engineer class
const Intern = require("./lib/Intern"); // Import Intern class
const inquirer = require("inquirer"); // Import inquirer for CLI prompts
const path = require("path"); // Import path module for file paths
const fs = require("fs"); // Import fs module for file system operations
const render = require("./src/page-template.js"); // Import render function for generating HTML

// Output directory path and HTML file path
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Array to store team members
const team = [];

// Function to prompt for manager details
const promptManager = async () => {
    // Prompt for manager details
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

    // console.log("Answers received:", { name, id, email, officeNumber });

    // Create new Manager instance and add to team array
    const manager = new Manager(name, id, email, officeNumber);
    team.push(manager);
    // console.log("Manager added to the team:", manager);
    // console.log("Current team:", team);
};

// Function to prompt for employee type
const promptEmployee = async () => {
    // Prompt for employee type choice
    const { userChoice } = await inquirer.prompt([
        {
            type: "list",
            message: "Who would you like to add to the team?",
            name: "userChoice",
            choices: ["Add an Engineer", "Add an Intern", "Finish building the team"]
        }
    ]);
    // Based on choice, call respective prompt function
    if (userChoice === "Add an Engineer") {
        await promptEngineer();
    } else if (userChoice === "Add an Intern") {
        await promptIntern();
    }
};

// Function to prompt for engineer details
const promptEngineer = async () => {
    // Prompt for engineer details
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
    // Create new Engineer instance and add to team array
    const engineer = new Engineer(name, id, email, github);
    team.push(engineer);
    // console.log("Engineer added to the team:", engineer);
    // console.log("Current team:", team);
};

// Function to prompt for intern details
const promptIntern = async () => {
    // Prompt for intern details
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
    // Create new Intern instance and add to team array
    const intern = new Intern(name, id, email, school);
    team.push(intern);
    // console.log("Intern added to the team:", intern);
    // console.log("Current team:", team);
};

// Function to generate HTML file
const generateHTML = () => {
    // console.log("Output directory path:", OUTPUT_DIR);
    // console.log("Checking if output directory exists...");
    // Check if output directory exists, if not create it
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
        // console.log("Output directory created at", OUTPUT_DIR);
    } else {
        // console.log("Output directory already exists at", OUTPUT_DIR);
    }

    // console.log("Writing HTML file to path:", outputPath);
    // console.log("Attempting to write HTML file...");

    // Generate HTML for the entire team
    const html = render(team);

    // Write HTML content to file
    fs.writeFileSync(outputPath, html, "utf-8");

    // console.log("Team HTML generated at", outputPath);
    // console.log("Checking if HTML file exists after write attempt:", fs.existsSync(outputPath));

    // console.log("Contents of output directory:", fs.readdirSync(OUTPUT_DIR));
};

// Function to initialize application
const init = async () => {
    console.log("Please enter manager details:");
    await promptManager();
    
    let finishBuilding = false;
    // Loop to prompt for adding more team members or finish building
    while (!finishBuilding) {
        await promptEmployee();
        // Prompt user for choice to add more or finish building
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

// Initialize application
init();
