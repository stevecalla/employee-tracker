const {
  getUserChoice,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
} = require("./runInquirer");
const { banner } = require("./banner");
const { blue } = require("../../lib/util");

//ASK USER WHAT ACTION TO PERFORM
getWhatToDo = async () => {
  await getUserChoice()
    .then((choices) => choices.userSelection) //passes selection to next then statement
    .then((selection) => { //determine which question or data to display
      console.log(selection);
      switch (selection) {
        case "View All Employees":
          //todo:get and render list of employees
          console.log("Get & Render a list of all employees!!");
          console.log("------------------------\n");
          getWhatToDo();
          break;
        case "Add Employee":
          getInfo(getEmployee, "employee");
          break;
        case "Update Employee Role":
          getInfo(getUpdateEmployeeRole, "updateRole");
          break;
        case "View All Roles":
          //todo:get and render list of roles
          console.log("Get & Render a list of all roles!!");
          console.log("------------------------\n");
          getWhatToDo();
          break;
        case "Add Role":
          getInfo(getRole, "role");
          break;
        case "View All Departments":
          //todo:get and render list of departments
          console.log("Get and Render a list of all departments!!");
          console.log("------------------------\n");
          getWhatToDo();
          break;
        case "Add Department":
          getInfo(getDepartment, "department");
          break;
        default:
          console.log(selection)
          process.exit();
    }});
};

// ASK USER TO INPUT EMPLOYEE, ROLE, DEPARTMENT OR ROLE UPDATE; PASS IN ASKQUESTION FUNCTION, TYPE OF QUESTION. RETURN TO THE GETWHATTODO FUNCTION
getInfo = async (askQuestions, type) => {
  let input = {};
  await askQuestions()
    .then((data) => input = data)
    // .then(() => console.log(input))
    .then(() => renderInput(input, type))
    .then(() => getWhatToDo())

    // Updated First Last Names role to XYZ
    // .then(() => create class using input)
    // .then(() => write to database using new class method?)
    // .then(() => console.log(`${input.role} ${type}`))
};

//DETERMINE WHICH INPUT TO RENDER TO THE USER
renderInput = (input, type) => {
  let inputToRender = "";
  input.firstName ? inputToRender = `${input.firstName} ${input.lastName}` : input.department ? inputToRender = input.department : inputToRender = input.role

  type === "updateRole" ? console.log(`\n${blue}Updated ${input.employee}'s role to ${input.newRole}`) : console.log(`\n${blue}Added ${inputToRender} to the database.`)
}

console.log(banner);
getWhatToDo();

module.exports = {
  // getWhatToDo,
};