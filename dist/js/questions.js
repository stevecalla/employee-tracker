const {
  capitalizeFirstCharacter,
  isNumber,
  isBlank,
  blue,
  white,
} = require("../../helpers/util");
const inquirer = require("inquirer");
const Departments = require("../../dist/lib/Departments");
const Roles = require("../../dist/lib/Roles");
const Employees = require("../../dist/lib/Employees");

choicesStart = [
  new inquirer.Separator(`-- Employees --`),
  "View All Employees",
  "Add Employee", // see questionsAddEmployee
  "Update Employee Role", // see questionsUpdateEmployee Role
  "Update Employee Manager",
  "Delete Employee",
  new inquirer.Separator(`-- Roles --`),

  "View All Roles",
  "Add Role", // see questionsAddRole
  "Delete Role",
  new inquirer.Separator(`-- Departments --`),

  "View All Departments",
  "Add Department", // see questionsAddDepartment
  "Delete Department",
  new inquirer.Separator(`-- Reports --`),

  "View Employees by Manager",
  "View Employees by Department",
  "View Department by Salary",
  new inquirer.Separator(`-- Quit --`),

  "Quit",
];

choicesDepartments = async () => {
  let viewDepartmentsList = new Departments();
  let deparmentsData = await viewDepartmentsList.fetchDepartmentsList(
    "api/departments"
  );
  let departments = deparmentsData.data.map((element) => element.Department);
  return departments;
};

choicesRoles = async () => {
  let viewRolesList = new Roles();
  let rolesData = await viewRolesList.fetchRolesList("api/roles");
  let roles = rolesData.data.map((element) => element.Title);
  return roles;
};

choicesEmployees = async () => {
  let viewEmployeesList = new Employees();
  let employeesData = await viewEmployeesList.fetchEmployeesList(
    "api/employees"
  );
  let employees = employeesData.data.map(
    (element) => `${element.First_Name} ${element.Last_Name}`
  );
  return employees;
};

const questionsUserChoice = [
  {
    prefix: `${white}\nā š”`,
    type: "rawlist",
    name: "userSelection",
    message: `What would you like to do?`,
    choices: choicesStart,
    suffix: " š”",
    pageSize: 12,
  },
];

const questionsAddDepartment = [
  // maps to Add Department
  {
    prefix: "ā š” 1 of 1)",
    type: "input",
    name: "department",
    message: `${white}Enter the name of the ${blue}department${white}?`,
    default: "New Department",
    suffix: " š”",
    validate(answer) {
      return isBlank(answer, "department name");
    },
    filter(answer) {
      return capitalizeFirstCharacter(answer);
    },
  },
];

const questionsAddRole = [
  // maps to Add Role
  {
    prefix: "ā š” 1 of 3)",
    type: "input",
    name: "role",
    message: `${white}Enter the ${blue}role${white}?`,
    choices: choicesRoles,
    default: "New Role",
    suffix: " š”",
    filter(answer) {
      return capitalizeFirstCharacter(answer);
    },
  },
  {
    prefix: "ā š” 2 of 3)",
    type: "input",
    name: "salary",
    message: `${white}Enter the ${blue}salary${white} of the role (with no commas)?`,
    default: "10000",
    suffix: " š”",
    validate(answer) {
      return isNumber(answer);
    },
    filter(answer) {
      return parseInt(answer);
    },
  },
  {
    prefix: "ā š” 3 of 3)",
    type: "rawlist",
    name: "roleDepartment",
    message: `${white}Enter the ${blue}department${white} of the role?`,
    choices: choicesDepartments,
    suffix: " š”",
  },
];

const questionsAddEmployee = [
  {
    prefix: "ā š” 1 of 4)",
    type: "input",
    name: "firstName",
    message: `${white}Enter the ${blue}first${white} name?`,
    default: "Steve",
    suffix: " š”",
    validate(answer) {
      return isBlank(answer, "first name");
    },
    filter(answer) {
      return capitalizeFirstCharacter(answer);
    },
  },
  {
    prefix: "ā š” 2 of 4)",
    type: "input",
    name: "lastName",
    message: `${white}Enter the ${blue}last${white} name?`,
    default: "Calla",
    suffix: " š”",
    validate(answer) {
      return isBlank(answer, "last name");
    },
    filter(answer) {
      return capitalizeFirstCharacter(answer);
    },
  },
  {
    prefix: "ā š” 3 of 4)",
    type: "rawlist",
    name: "role",
    message: `${white}Enter the ${blue}employee's role${white}?`,
    choices: choicesRoles,
    suffix: " š”",
  },
  {
    prefix: "ā š” 4 of 4)",
    type: "rawlist",
    name: "employeeManager",
    message: `${white}Enter the ${blue}employee's manager${white}?`,
    choices: choicesEmployees,
    suffix: " š”",
  },
];

const questionsUpdateEmployeeRole = [
  // maps to Add Role
  {
    prefix: "ā š” 1 of 2)",
    type: "rawlist",
    name: "employee",
    message: `\u001b[0;1mSelect ${blue}employee${white} to update?`,
    choices: choicesEmployees,
    suffix: " š”",
  },
  {
    prefix: "ā š” 2 of 2)",
    type: "rawlist",
    name: "role",
    message: `\u001b[0;1mSelect ${blue}new role${white}?`,
    choices: choicesRoles,
    default: "Manager",
    suffix: " š”",
  },
];

const questionsUpdateEmployeeManager = [
  // maps to Add Role
  {
    prefix: "ā š” 1 of 2)",
    type: "rawlist",
    name: "employee",
    message: `\u001b[0;1mSelect ${blue}employee${white} to update?`,
    choices: choicesEmployees,
    // default: "Manager",
    suffix: " š”",
  },
  {
    prefix: "ā š” 2 of 2)",
    type: "rawlist",
    name: "employeeManager",
    message: `${white}Enter the ${blue}employee's manager${white}?`,
    choices: choicesEmployees,
    suffix: " š”",
  },
];

const questionsDeleteRole = [
  // maps to Delete Role
  {
    prefix: "ā š” 1 of 2)",
    type: "rawlist",
    name: "role",
    message: `\u001b[0;1mSelect ${blue}role${white} to delete?`,
    choices: choicesRoles,
    suffix: " š”",
  },
  {
    prefix: "ā š” 2 of 2)",
    type: "confirm",
    name: "confirm",
    message: (answers) =>
      `\u001b[0;1mConfirm you would like to ${blue}delete ${answers.role}${white}?`,
    suffix: " š”",
  },
];

const questionsDeleteDepartment = [
  // maps to Delete Role
  {
    prefix: "ā š” 1 of 2)",
    type: "rawlist",
    name: "department",
    message: `\u001b[0;1mSelect ${blue}department${white} to delete?`,
    choices: choicesDepartments,
    suffix: " š”",
  },
  {
    prefix: "ā š” 2 of 2)",
    type: "confirm",
    name: "confirm",
    message: (answers) =>
      `\u001b[0;1mConfirm you would like to ${blue}delete ${answers.department}${white}?`,
    suffix: " š”",
  },
];

const questionsDeleteEmployee = [
  // maps to Delete Role
  {
    prefix: "ā š” 1 of 2)",
    type: "rawlist",
    name: "employee",
    message: `\u001b[0;1mSelect ${blue}employee${white} to delete?`,
    choices: choicesEmployees,
    suffix: " š”",
  },
  {
    prefix: "ā š” 2 of 2)",
    type: "confirm",
    name: "confirm",
    message: (answers) =>
      `\u001b[0;1mConfirm you would like to ${blue}delete ${answers.employee}${white}?`,
    suffix: " š”",
  },
];

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
