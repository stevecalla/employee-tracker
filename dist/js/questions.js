const { capitalizeFirstCharacter, lowerCase, isNumber, isEmail, isBlank, blue, white } = require("../../lib/util");
const axios = require('axios');

choicesStart = [
  "View All Employees",
  "Add Employee", // see questionsAddEmployee
  "Update Employee Role", // see questionsUpdateEmployee Role

  "Update Employee Manager", //todo
  
  "View All Roles",
  "Add Role", // see questionsAddRole
  "View All Departments",
  "Add Department", // see questionsAddDepartment
  "View Employees by Manager", //todo:DONE
  "View Employees by Department", //todo:DONE
  "View Department by Salary", //todo
  "Delete Role", //todo:DONE
  "Delete Department", //todo:DONE
  "Delete Employee", //todo:DONE
  "Quit",
];

choicesDepartments = async () => {
  let departmentData = await axios.get(`http://localhost:3001/api/departments`);
  let departments = departmentData.data.map(element => element.Department);
  return departments;
}

choicesRoles = async () => {
  let rolesData = await axios.get(`http://localhost:3001/api/roles`);
  let roles = rolesData.data.map(element => element.Title);
  return roles;
}

choicesEmployees = async () => {
  let employeesData = await axios.get(`http://localhost:3001/api/employees`);
  let employees = employeesData.data.map(element => `${element.First_Name} ${element.Last_Name}`);
  return employees;
}

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
    suffix: " 🟡",
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
    name: "role",
    message: `\u001b[0;1mSelect ${blue}new role${white}?`,
    choices: choicesRoles,
    default: "Manager",
    suffix: " 🟡",
  },
];

const questionsUpdateEmployeeManager = [ // maps to Add Role
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
    name: "employeeManager",
    message: `${white}Enter the ${blue}employee's manager${white}?`,
    choices: choicesEmployees,
    suffix: " 🟡",
  },
];

const questionsDeleteRole = [ // maps to Delete Role
  {
    prefix: "⠋🟡 1 of 2)",
    type: "rawlist",
    name: "role",
    message: `\u001b[0;1mSelect ${blue}role${white} to delete?`,
    choices: choicesRoles,
    suffix: " 🟡",
  },
  {
    prefix: "⠋🟡 2 of 2)",
    type: "confirm",
    name: "confirm",
    message: (answers) => `\u001b[0;1mConfirm you would like to ${blue}delete ${answers.role}${white}?`,
    suffix: " 🟡",
  },
];

const questionsDeleteDepartment = [ // maps to Delete Role
  {
    prefix: "⠋🟡 1 of 2)",
    type: "rawlist",
    name: "department",
    message: `\u001b[0;1mSelect ${blue}department${white} to delete?`,
    choices: choicesDepartments,
    suffix: " 🟡",
  },
  {
    prefix: "⠋🟡 2 of 2)",
    type: "confirm",
    name: "confirm",
    message: (answers) => `\u001b[0;1mConfirm you would like to ${blue}delete ${answers.department}${white}?`,
    suffix: " 🟡",
  },
];

const questionsDeleteEmployee = [ // maps to Delete Role
  {
    prefix: "⠋🟡 1 of 2)",
    type: "rawlist",
    name: "employee",
    message: `\u001b[0;1mSelect ${blue}employee${white} to delete?`,
    choices: choicesEmployees,
    suffix: " 🟡",
  },
  {
    prefix: "⠋🟡 2 of 2)",
    type: "confirm",
    name: "confirm",
    message: (answers) => `\u001b[0;1mConfirm you would like to ${blue}delete ${answers.employee}${white}?`,
    suffix: " 🟡",
  },
]

module.exports = {
  questionsUserChoice,
  questionsAddDepartment,
  questionsAddRole,
  questionsAddEmployee,
  questionsUpdateEmployeeRole,
  questionsUpdateEmployeeManager,
  questionsDeleteRole,
  questionsDeleteDepartment,
  questionsDeleteEmployee,
};
