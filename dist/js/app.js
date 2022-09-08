const {
  getUserChoice,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
  getUpdateEmployeeManager,
  getDeleteRoleDeptEmp,

} = require("./runInquirer");
const { banner } = require("./banner");
const { blue, white } = require("../../lib/util");
const consoleTable = require('console.table');
const axios = require('axios');
const Departments = require('../../lib/Departments');
const Roles = require('../../lib/Roles');
const Employees = require('../../lib/Employees');
const { questionsDeleteDepartment } = require("./questions");

//ASK USER WHAT ACTION TO PERFORM
getWhatToDo = async () => {
  await getUserChoice()
    .then((choices) => choices.userSelection) //passes selection to next then statement
    .then((selection) => { //determine which question or data to display
      switch (selection) {
        case "View All Employees":
          let viewAllEmployees = new Employees();
          viewAllEmployees.fetchAllEmployees('api/employees', "View All Employees");
          break;
        case "Add Employee":
          addNewEmployee('api/employees', "employee");
          break;
        case "Update Employee Role":
          updateEmployeeRole('api/employees', "updateRole");
          break;
        case "Update Employee Manager":
          updateEmployeeManager('api/employees', "updateRole");
          break;
        case "Delete Employee":
          deleteCurrentEmployee('api/employees', "employee");
          break;

        case "View All Roles":
          let viewAllRoles = new Roles();
          viewAllRoles.fetchAllRoles('api/roles', "View All Roles");
          break;
        case "Add Role":
          addNewRole('api/roles', "role");
          break;
        case "Delete Role":
          deleteCurrentRole('api/roles', "role");
          break;

        case "View All Departments":
          let viewAllDepartments = new Departments();
          viewAllDepartments.fetchAllDepartments('api/departments', "View All Departments");
          break;
        case "Add Department":
          addNewDepartment('api/departments', "department");
          break;
        case "Delete Department":
          deleteCurrentDepartment('api/departments', "department");
          break;

        case "View Employees by Manager":
          let viewEmployeeByManager = new Employees();
          viewEmployeeByManager.fetchEmployeeByManager('api/employees', "viewbymanager", "View by Manager");
          break;
        case "View Employees by Department":
          let viewEmployeeByDepartment = new Employees();
          viewEmployeeByDepartment.fetchEmployeeByDepartment('api/employees', "viewbydepartment", "View by Department");
          break;
        case "View Department by Salary":
          let viewDepartmentbySalary = new Departments();
          viewDepartmentbySalary.fetchDepartmentBySalary('api/departments', "viewdeptbysalary", "View Department by Salary");
          break;
        default:
          process.exit();
    }});
};

addNewEmployee = async (path, type) => {
  let role = new Roles(); //declare role
  let employee = {};
  let roleId = 0;
  let managerId = 0;

  await getEmployee() //get data
    .then((data) => employee = new Employees(data.firstName, data.lastName, data.role, data.employeeManager))
    // .then(() => console.log(employee))
    .then(() => role.fetchRoleId('api/roles', employee.getRole(), type)) //fetch role id
    .then((id_1) => roleId = id_1)
    // .then(() => console.log(roleId))
    .then(() => employee.fetchEmployeeId('api/employees', employee.getManager(), type)) //fetch manager id; note input is the employeeManager
    .then((id_3) => managerId = id_3[0].id)
    // .then(() => console.log(managerId))
    .then(() => employee.addNewEmployee(path, employee.getEmployee(), type, roleId, managerId)) //post new employee
    .then((isCurrentEmployee) => employee.renderAddEmployeeMessage(employee.getEmployee(), isCurrentEmployee)) //render message
    .then(() => getWhatToDo()); //start over
}

addNewRole = async (path) => {
  let department = new Departments(); //declare department

  let role = {};
  let roleId = 0;
  let deptId = 0;

  await getRole() //get data
    .then((data) => role = new Roles(data.role, data.salary, data.roleDepartment))
    .then(() => console.log(role, role.getRole()))
    .then(() => role.fetchRoleId(path, role.getTitle())) //fetch role id
    .then((id_1) => roleId = id_1)
    .then(() => department.fetchDepartmentId('api/departments', role.getDepartment())) //fetch department id
    .then((id_2) => deptId = id_2)
    .then(() => role.addNewRole(path, role.getRole(), deptId)) //post new employee
    .then((isCurrentRole) => role.renderAddRoleMessage(role.getRole(), isCurrentRole)) //render message
    .then(() => getWhatToDo()); //start over
}

addNewDepartment = async (path) => {
  let department = {};

  await getDepartment() //get data
    .then((data) => department = new Departments(data.department))
    // .then(() => console.log(department, department.getDepartment()))
    .then(() => department.addNewDepartment(path, department.getDepartment())) //post new employee
    .then((isCurrentDepartment) => department.renderAddDepartmentMessage(department.getDepartment(), isCurrentDepartment)) //render message
    .then(() => getWhatToDo()); //start over
}

updateEmployeeRole = async (path, type) => {
  let role = new Roles(); //declare role
  let employee = new Employees(); //declare manager

  let input = {};
  let roleId = 0;
  let employeeId = 0;

  await getUpdateEmployeeRole() //get data
    .then((data) => input = data)
    // .then(() => console.log(input))
    .then(() => role.fetchRoleId('api/roles', input.role, type)) //fetch role id
    .then((id_1) => roleId = id_1)
    // .then(() => console.log('role = ', roleId))
    .then(() => employee.fetchEmployeeId('api/employees', input.employee, type)) //fetch manager id; note input is the employee
    .then((id_3) => employeeId = id_3[0].id)
    // .then(() => console.log(employeeId))
    .then(() => employee.updateEmployeeRole(path, roleId, employeeId)) //update role
    .then(() => employee.renderUpdateRoleMessage(input)) //render message
    .then(() => getWhatToDo()); //start over
}

updateEmployeeManager = async (path, type) => {
  let role = new Roles(); //declare role
  let employee = new Employees(); //declare manager

  let input = {};
  let roleId = 0;
  let employeeId = 0;

  await getUpdateEmployeeManager() //get data
    .then((data) => input = data)
    // .then(() => console.log(input, input.employeeManager))
    .then(() => role.fetchRoleId('api/roles', input.role, type)) //fetch role id
    .then((id_1) => roleId = id_1)
    // .then(() => console.log(roleId))
    .then(() => employee.fetchEmployeeId('api/employees', input.employeeManager, type)) //fetch manager id; note input is the employeeManager
    .then((id_3) => managerId = id_3[0].id)
    // .then(() => console.log(employeeId))
    .then(() => employee.updateEmployeeManager(path, input, managerId)) //update role
    .then(() => employee.renderUpdateManagerMessage(input)) //render message
    .then(() => getWhatToDo()); //start over
}

tableOutput = (data, selection = "Hello") => {
  let lineBreak = `\n`;
  let title = `----------- ${selection} -----------`;
  console.log(`${blue}${lineBreak}${title}${white}${lineBreak}`);
  console.table(data);
  console.log(`${blue}${title}${white}`);
};

deleteCurrentEmployee = async (path, list) => {
  let employee = new Employees(); //declare employee

  await getDeleteRoleDeptEmp(list)
  .then((data) => input = data)
  .then(() => employee.deleteEmployee(path, input, list))
  .then(() => employee.renderDeleteEmployeeMessage(input[list]))
  .then(() => getWhatToDo())
}

deleteCurrentRole = async (path, list) => {
  let role = new Roles(); //declare role

  await getDeleteRoleDeptEmp(list)
  .then((data) => input = data)
  .then(() => role.deleteRole(path, input, list))
  .then(() => role.renderDeleteRoleMessage(input[list]))
  .then(() => getWhatToDo())
}

deleteCurrentDepartment = async (path, list) => {
  let department = new Departments(); //declare department

  await getDeleteRoleDeptEmp(list)
  .then((data) => input = data)
  .then(() => department.deleteDepartment(path, input, list))
  .then(() => department.renderDeleteDepartmentMessage(input[list]))
  .then(() => getWhatToDo())
}

// console.log(banner);
getWhatToDo();