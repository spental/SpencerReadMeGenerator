


const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const MakeReadMe = require("./MakeReadMe")
const apiCall = require("./api")
const writeFileAsync = util.promisify(fs.writeFile);



function promptUser(){
    return inquirer.prompt([
        {
            type: "checkbox",
            message: "Select the contents of your Table of Contents",
            name: "tableOfContents",
            choices: [
                "Project Title",
                "Description",
                "Installation",
                "Usage",
                "License",
                "Contributing",
                "Tests",
                "Questions"
            ]
        },
        {
            type: "input",
            name: "projectTitle",
            message: "What is the project title?",
        },
        {
            type: "input",
            name: "description",
            message: "Write a brief description of your project"
        },
        
        {
            type: "input",
            name: "usage",
            message: "What is this project usage for?"
        },
        {
            type: "list",
            name: "license",
            message: "Chose the appropiate license for this project",
            choices: [
                "Apache License 2.0",
                "Academic Free License v3.0",
                "GNU General Public License v3.0",
                "ISC",
                "MIT License",
                "Mozilla Public License 2.0",
                "Open Software License 3.0",
                "The Unlicense"
            ]
        },
        {
            type: "input",
            name: "contributing",
            message: "Who are the contributors of this projects?"
        },
        {
            type: "input",
            name: "tests",
            message: "Is there a Test included"
        },
        {
            type: "input",
            name: "acknowledgments",
            message: "Is anyone to be acknowledge?"
        },
        {
            type: "input",
            name: "questions",
            message: "What do I do if I have an issue?"
        },
        {
            type: "input",
            name: "username",
            message: "Please enter your GitHub username"
        }
    ]);
} 

async function init() {
    try { 
        const answers =  await promptUser();
        const result = await apiCall(answers.username);
        answers.email = result.email;
        answers.avar_url = result.avar_url;
        const generateContent = MakeReadMe(answers);
        console.log(result);
        await writeFileAsync("README.md", generateContent);
        console.log("README.md Alteration Complete");
    } catch(err) {
        console.log(err);
    }
}
init();