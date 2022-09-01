const { capitalizeFirstCharacter, lowerCase, isNumber, isEmail, isBlank } = require("../../lib/util");

choicesStart = [
  "View All Employees", // todo:returns a table of employees
  "Add Employee", // see questionsAddEmployee
  "Update Employee Role", // see questionsUpdateEmployee Role
  "View All Roles", // todo:returns a table of role
  "Add Role", // see questionsAddRole; //todo:need to update roles choice list with new role
  "View All Departments", // todo:returns a table of departments
  "Add Department", // see questionsAddDepartment
  "Quit",
];

choicesDepartments = [
  "Engineering",
  "Finance",
  "Legal",
  "Sales",
  "Service",
];

choicesRoles = [
  "Sales Lead",  //sales
  "Sales Person", //sales
  "Lead Engineer", //engineering
  "Software Engineer",  //engineering
  "Account Manager", //finance
  "Accountant", //finance
  "Legal Team Lead", //legal
  "Lawyer", //legal
  "Customer Service Representative", //service
];

choicesEmployees = [
  "a",
  "b",
  "c",
  "d",
];

const questionsUserChoice = [
  {
    prefix: "\n⠋🟡",
    type: "rawlist",
    name: "userSelection",
    message: "What would you like to do?",
    choices: choicesStart,
    suffix: " 🟡",
  },
];

const questionsAddDepartment = [ // maps to Add Department
  {
    prefix: "⠋🟡 1 of 1)",
    type: "input",
    name: "department",
    message: `\u001b[0;1mEnter the name of the \x1b[36;1mdepartment\u001b[0;1m?`,
    default: "New Department",
    suffix: " 🟡",
    validate(answer) {
      return isBlank(answer, "department name");
    },
    filter(answer) {
      return capitalizeFirstCharacter(answer);
    },
  },
];

const questionsAddRole = [ // maps to Add Role
{
  prefix: "⠋🟡 1 of 3)",
  type: "input",
  name: "role",
  message: `\u001b[0;1mEnter the \x1b[36;1mrole\u001b[0;1m?`,
  choices: choicesRoles,
  default: "New Role",
  suffix: " 🟡",
  filter(answer) {
    return capitalizeFirstCharacter(answer);
  }
},
{
  prefix: "⠋🟡 2 of 3)",
  type: "input",
  name: "department",
  message: `\u001b[0;1mEnter the \x1b[36;1msalary\u001b[0;1m of the role (with no commas)?`,
  default: "10000",
  suffix: " 🟡",
  validate(answer) {
    return isNumber(answer);
  },
  filter(answer) {
    // answer = parseInt(answer).toLocaleString();
    // console.log(answer, typeof(answer), answer.toLocaleString());
    //convert to parseInt in the role class
    return parseInt(answer);
  },
},
{
  prefix: "⠋🟡 3 of 3)",
  type: "rawlist",
  name: "salary",
  message: `\u001b[0;1mEnter the \x1b[36;1mdepartment\u001b[0;1m of the role?`,
  choices: choicesDepartments,
  // default: "Manager",
  suffix: " 🟡",
},
];

const questionsAddEmployee = [
  {
    prefix: "⠋🟡 1 of 6)",
    type: "input",
    name: "firstName",
    message: `\u001b[0;1mEnter the \x1b[36;1mfirst\u001b[0;1m name?`,
    default: "Steve",
    suffix: " 🟡",
    validate(answer) {
      return isBlank(answer, "first name");
    },
    filter(answer) {
      return capitalizeFirstCharacter(answer);
    },
  },
  {
    prefix: "⠋🟡 2 of 6)",
    type: "input",
    name: "lastName",
    message: `\u001b[0;1mEnter the \x1b[36;1mlast\u001b[0;1m name?`,
    default: "Calla",
    suffix: " 🟡",
    validate(answer) {
      return isBlank(answer, "last name");
    },
    filter(answer) {
      return capitalizeFirstCharacter(answer);
    },
  },
  {
    prefix: "⠋🟡 3 of 6)",
    type: "input",
    name: "role",
    message: `\u001b[0;1mEnter the \x1b[36;1memployee's role\u001b[0;1m?`,
    default: "Manager",
    suffix: " 🟡",
    validate(answer) {
      return isBlank(answer, "the role");
    },
    filter(answer) {
      return answer.trim();
    },
  },
  {
    prefix: "⠋🟡 4 of 6)",
    type: "input",
    name: "role",
    message: `\u001b[0;1mEnter the \x1b[36;1memployee's manager\u001b[0;1m?`,
    default: "Manager",
    suffix: " 🟡",
    validate(answer) {
      return isBlank(answer, "the role");
    },
    filter(answer) {
      return answer.trim();
    },
  },
  {
    prefix: "⠋🟡 5 of 6)",
    name: "employeeId",
    type: "input",
    message: `\u001b[0;1mEnter the \x1b[36;1memployee ID\u001b[0;1m?`,
    default: "1",
    validate(answer) {
      return isNumber(answer);
    },
    filter(answer) {
      return answer;
    },
  },
  {
    prefix: "⠋🟡 6 of 6)",
    name: "emailAddress",
    type: "input",
    message: `\u001b[0;1mEnter the \x1b[36;1memail address\u001b[0;1m?`,
    default: "callasteven@gmail.com",
    validate(answer) {
      return isEmail(answer);
    },
  },
];

const questionsUpdateEmployeeRole = [ // maps to Add Role
{
  prefix: "⠋🟡 1 of 2)",
  type: "rawlist",
  name: "role",
  message: `\u001b[0;1mSelect \x1b[36;1memployee\u001b[0;1m to update?`,
  choices: choicesEmployees,
  default: "Manager",
  suffix: " 🟡",
},
{
  prefix: "⠋🟡 2 of 2)",
  type: "rawlist",
  name: "newRole",
  message: `\u001b[0;1mSelect \x1b[36;1new role\u001b[0;1m?`,
  choices: choicesRoles,
  default: "Manager",
  suffix: " 🟡",
},
];

module.exports = {
  questionsUserChoice,
  questionsAddDepartment,
  questionsAddRole,
  questionsAddEmployee,
  questionsUpdateEmployeeRole,

};
