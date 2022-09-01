const {
  getUserChoice,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
} = require("./runInquirer");

questionPrompts = async () => {
  // console.log(`\n\u001b[0;1mLET'S GET STARTED!!`);

  await getUserChoice()
    .then((choices) => choices.userSelection) //passes selection to next then statement
    .then((selection) => {
      console.log(selection);
      switch (selection) {
        case "View All Employees":
          //todo:get and render list of employees
          console.log("Get & Render a list of all employees!!");
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
          console.log("Get & Render a list of all roles!!");
          console.log("------------------------\n");
          questionPrompts();
          break;
        case "Add Role":
          getInfo(getRole, "role");
          break;
        case "View All Departments":
          //todo:get and render list of departments
          console.log("Get and Render a list of all departments!!");
          console.log("------------------------\n");
          questionPrompts();
          break;
        case "Add Department":
          getInfo(getDepartment, "department");
          break;
        default:
          console.log(selection)
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
