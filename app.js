const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeList = [];

//Ask for manager Info
function askUserForManagerInfo (){
    return inquirer.prompt([
        {
            message:"What is the manager's name",
            name:"managerName",
            type:"input",
        },
        {
            message:"What is the manager's id number",
            name:"managerId",
            type:"input",
        },
        {
            message:"What is the manager's email address",
            name:"managerEmail",
            type:"input",
        },
        {
            message:"What is the manager's office number",
            name:"officeNumber",
            type:"input",
        }

    ]).then((managerData)=>{
        const newManager = new Manager (managerData.name,managerData.id,managerData.email,managerData.officeNumber);
        employeeList.push(newManager);
        askUserForEmployeeType();
    })
}
//ask user for which employee type (options are: Engineer,intern, I don't want to add an more team members)
function askUserForEmployeeType (){
    return inquirer.prompt([
        {
            message:"What type of employee do you wish to add",
            name:"employeeType",
            type:"list",
            choices:["Engineer","Intern","I don't want to add any more members"]
        },
        
    ]).then((newEmployeeData)=>{
        //If Engineer is selected
        if (newEmployeeData === "Engineer"){
            askUserForEngineerInfo()
        } else if(newEmployeeData === "Intern"){
            askUserForInternInfo();
        }else{
            const htmlPage = render (employeeList)
        }
        // employeeList.push(newEmp);
    })
}

// after the user chooses an option, for example: the user chose Engineer, then:

// Ask for engineer info
function askUserForEngineerInfo (){
    return inquirer.prompt([
        {
            message:"What is the name of the Engineer",
            name:"engineerName",
            type:"input",
        },
        {
            message:"What is the engineer's id number",
            name:"engineerId",
            type:"input",
        },
        {
            message:"What is the engieneer email address",
            name:"engineerEmail",
            type:"input",
        },
        {
            message:"What is the engineer gitHub username",
            name:"githubUserName",
            type:"input",
        }

    ]).then((engineerData)=>{
        const newEngineer = new Engineer (newEngineer.name,newEngineer.id,newEngineer.email,newEngineer.githubUserName);
        employeeList.push(newEngineer);
    })
}
// Ask the user for intern info 
function askUserForInternInfo (){
    return inquirer.prompt([
        {
            message:"What is the name of the intern",
            name:"internName",
            type:"input",
        },
        {
            message:"What is the name of the Intern",
            name:"internName",
            type:"input",
        },
        {
            message:"What is the intern id number",
            name:"internId",
            type:"input",
        },
        {
            message:"What is the intern School Name",
            name:"schoolName",
            type:"input",
        }

    ]).then((managerData)=>{
        const newIntern = new Intern (newIntern.name,newIntern.id,newIntern.email,newIntern.schoolName);
        employeeList.push(newManager);
    })
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
