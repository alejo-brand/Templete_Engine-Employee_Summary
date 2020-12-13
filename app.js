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
            name:"name",
            type:"input",
        },
        {
            message:"What is the manager's id number",
            name:"id",
            type:"input",
        },
        {
            message:"What is the manager's email address",
            name:"email",
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
            choices:[{name:"Engineer", value: 0}, {name:"Intern", value: 1}, {name:"I don't want to add any more members to the team", value: 2}],
        },
        
    ]).then((newEmployeeData)=>{
        //If Engineer is selected
        if (newEmployeeData.employeeType === 0){
            askUserForEngineerInfo()
        } else if(newEmployeeData.employeeType === 1){
            askUserForInternInfo();
        }else{
            createHtml();
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
            name:"name",
            type:"input",
        },
        {
            message:"What is the engineer's id number",
            name:"id",
            type:"input",
        },
        {
            message:"What is the engieneer email address",
            name:"email",
            type:"input",
        },
        {
            message:"What is the engineer gitHub username",
            name:"gitHub",
            type:"input",
        }

    ]).then((engineerData)=>{
        const newEngineer = new Engineer (engineerData.name, engineerData.id, engineerData.email, engineerData.githubUserName);
        employeeList.push(newEngineer);
    })
}
// Ask the user for intern info 
function askUserForInternInfo (){
    return inquirer.prompt([
        {
            message:"What is the name of the intern",
            name:"name",
            type:"input",
        },
        {
            
            message:"What is the intern id number",
            name:"id",
            type:"input",
        },
        {
            message:"What is the intern email address",
            name:"email",
            type:"input",
        },
        {
            message:"What is the intern School Name",
            name:"school",
            type:"input",
        }

    ]).then((internData)=>{
        const newIntern = new Intern (internData.name, internData.id, internData.email, internData.school);
        employeeList.push(newIntern);
    })
};

function createHtml (){
    const htmlPage = render (employeeList);
    fs.writeFile('output.html',htmlPage,(err)=>{
        err?
        console.log('FAILED TO WRITE FILE'):
        console.log('THE FILE HAS BEEN CREATED')
    })
}
askUserForManagerInfo();
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
