const {
  getStart,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
} = require("./runInquirer");
const { createMembers } = require("./createMembers.js");
const { createHTML } = require("./createHTML.js");
let teamMembers = [];

questionPrompts = async () => {
  // let basicInfo = {};
  let start = "";
  // console.log(`\n\u001b[0;1mLET'S GET STARTED!!`);

  await getStart()
    .then((data) => start = data.startQuestion)
    .then((data) => {
      console.log(data);
      switch (data) {
        case "View All Employees":
          //todo:get and render list of employees
          console.log("Render a list of all employees!!");
          console.log("------------------------\n");
          questionPrompts();
          break;
        case "Add Employee":
          // getEmployeeInfo();
          getInfo(getEmployee, "employee");
          break;
        case "Update Employee Role":
          getInfo(getUpdateEmployeeRole);
          break;
        case "View All Roles":
          //todo:get and render list of roles
          console.log("Render a list of all roles!!");
          console.log("------------------------\n");
          questionPrompts();
          break;
        case "Add Role":
          getInfo(getRole, "role");
          break;
        case "View All Departments":
          //todo:get and render list of departments
          console.log("Render a list of all departments!!");
          console.log("------------------------\n");
          questionPrompts();
          break;
        case "Add Department":
          getInfo(getDepartment, "department");
          break;
        default:
          console.log(data, data.startQuestion, 'end')
          process.exit();
    }});
};

getInfo = async (askQuestions, type) => {
  await askQuestions()
    // .then((data) => console.log(data))
    .then((data) => console.log(`create class; write ${type} info to database`, data))
    .then(() => questionPrompts())
};

questionPrompts();

module.exports = {
  // questionPrompts,
};
