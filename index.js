const MakeReadMe = require("./MakeReadMe");
const writeFileAsync = util.promisify(fs.writeFile);
const apiCall = require("./api");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");


function promptUser(){
    returninquirer.prompt([
        {
            type: "input",
            name: "ProjectTitle",
            message: "What will be the Title of the project?"

        },
        {
            type: "input",
            name: "ProjectTitle",
            message: "What will be the Title of the project?"

        },
        {
            type: "checkbox",
            message: "Select the contents you would like in your project Table of Contents?",
            name: "TableOfContents",
            choices: [
                "Project Title",
                "Description",
                "Usage",
                "License",
                "Contributing",
                "Tests",
                "Questions"
            ]

        }
    ]);
}

async function init() {
    try { 
        const answers =  await promptUser();
        const result = await apiCall(MakeReadMe.username);
        answers.email = results.email;
        answers.avar_url = results.avar_url;
        const generateContent = MakeReadMe(MakeReadMe);
        console.log("README.md Alteration Complete");
    } catch(err) {
        console.log(err);
    }
}
init();