const { capitalizeFirstCharacter, lowerCase, isNumber, isEmail, isBlank, blue, white } = require("../../lib/util");
// const { connectDb } = require('../../database');

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

choicesDepartments = () => {
  // let test = [];

  // connectDb.promise().query("SELECT id, name FROM departments ORDER BY id;")
  //   .then(([rows, fields]) => {
  //     console.log(rows)
  //     test = rows.map(element => element.name);
  //     console.log('1 = ', test);
  //     test2(test);
  //   })
  //   .catch(console.log)
  //   .then( () => connectDb.end());

  // console.log('2 = ', test);
  // return test;
  let departments = [
    "Engineering",
    "Finance",
    "Legal",
    "Sales",
    "Service",
  ]
  return departments;
  // return [
  //   "Engineering",
  //   "Finance",
  //   "Legal",
  //   "Sales",
  //   "Service",
  // ]
}

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
  "Other", //to be updated later
];

choicesEmployees = [
  "Sue Eight",
  "Zak Five",
  "Doreen Four",
  "Molly Nine",
  "John One",
  "Megan Seven",
  "Emily Six",
  "Molly Ten",
  "Rita Three",
  "Beth Two",
];

const questionsUserChoice = [
  {
    prefix: "\n⠋🟡",
    type: "rawlist",
    name: "userSelection",
    message: `${white}What would you like to do?`,
    choices: choicesStart,
    suffix: " 🟡",
  },
];

const questionsAddDepartment = [ // maps to Add Department
  {
    prefix: "⠋🟡 1 of 1)",
    type: "input",
    name: "department",
    message: `${white}Enter the name of the ${blue}department${white}?`,
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
  message: `${white}Enter the ${blue}role${white}?`,
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
  name: "salary",
  message: `${white}Enter the ${blue}salary${white} of the role (with no commas)?`,
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
  name: "roleDepartment",
  message: `${white}Enter the ${blue}department${white} of the role?`,
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
    message: `${white}Enter the ${blue}first${white} name?`,
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
    message: `${white}Enter the ${blue}last${white} name?`,
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
    type: "rawlist",
    name: "role",
    message: `${white}Enter the ${blue}employee's role${white}?`,
    choices: choicesRoles,
    // default: "Lawyer",
    suffix: " 🟡",
    // validate(answer) {
    //   return isBlank(answer, "the role");
    // },
    // filter(answer) {
    //   return capitalizeFirstCharacter(answer);
    // },
  },
  {
    prefix: "⠋🟡 4 of 6)",
    type: "rawlist",
    name: "employeeManager",
    message: `${white}Enter the ${blue}employee's manager${white}?`,
    choices: choicesEmployees,
    // default: "Joanne Smith",
    suffix: " 🟡",
    // validate(answer) {
    //   return isBlank(answer, "the role");
    // },
    // filter(answer) {
    //   return capitalizeFirstCharacter(answer);
    // },
  },
  // {
  //   prefix: "⠋🟡 5 of 6)",
  //   name: "employeeId",
  //   type: "input",
  //   message: `\u001b[0;1mEnter the ${blue}employee ID${white}?`,
  //   default: "1",
  //   validate(answer) {
  //     return isNumber(answer);
  //   },
  //   filter(answer) {
  //     return answer;
  //   },
  // },
  // {
  //   prefix: "⠋🟡 6 of 6)",
  //   name: "emailAddress",
  //   type: "input",
  //   message: `${white}Enter the ${blue}email address${white}?`,
  //   default: "callasteven@gmail.com",
  //   validate(answer) {
  //     return isEmail(answer);
  //   },
  // },
];

const questionsUpdateEmployeeRole = [ // maps to Add Role
{
  prefix: "⠋🟡 1 of 2)",
  type: "rawlist",
  name: "employee",
  message: `\u001b[0;1mSelect ${blue}employee${white} to update?`,
  choices: choicesEmployees,
  // default: "Manager",
  suffix: " 🟡",
},
{
  prefix: "⠋🟡 2 of 2)",
  type: "rawlist",
  name: "newRole",
  message: `\u001b[0;1mSelect ${blue}new role${white}?`,
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
