const MakeReadMe = require("./MakeReadMe")
const apiCall = require("./api")
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const { connected } = require("process");
const writeFileAsync = util.promisify(fs.writeFile);


function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "ProjectTitle",
            message: "What will be the Title of the project?",
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

        },
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