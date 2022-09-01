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

getTeamDetails = async () => {
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
          getTeamDetails();
          break;
        case "Add Employee":
          getEmployeeInfo();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          //todo:get and render list of roles
          console.log("Render a list of all roles!!");
          console.log("------------------------\n");
          getTeamDetails();
          break;
        case "Add Role":
          getRoleInfo();
          break;
        case "View All Departments":
          //todo:get and render list of departments
          console.log("Render a list of all departments!!");
          console.log("------------------------\n");
          getTeamDetails();
          break;
        case "Add Department":
          getDepartmentInfo();
          break;
        default:
          console.log(data, data.startQuestion, 'end')
          process.exit();
    }});
};

getEmployeeInfo = async () => {
  await getEmployee()
    .then((data) => console.log('write employee info to database'))
    .then(() => getTeamDetails())
};

getDepartmentInfo = async () => {
  await getDepartment()
    .then((data) => console.log('write department info to database'))
    .then(() => getTeamDetails())
};

getRoleInfo = async () => {
  await getRole()
    .then((data) => console.log('write role info to database'))
    .then(() => getTeamDetails())
};

update = async () => {
  await getUpdateEmployeeRole()
    .then((data) => console.log('write update role to database'))
    .then(() => getTeamDetails())
};

getTeamDetails();

module.exports = {
  // getTeamDetails,
};
