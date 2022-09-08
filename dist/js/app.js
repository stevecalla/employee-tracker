const {
  getUserChoice,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
  getUpdateEmployeeManager,
  getDeleteRoleDeptEmp,
  getDeleteEmployee,
  getDeleteRole,
  getDeleteDepartment

} = require("./runInquirer");
const { banner } = require("./banner");
const { blue, white } = require("../../lib/util");
const consoleTable = require('console.table');
const axios = require('axios');
const Departments = require('../../lib/Departments');
const Roles = require('../../lib/Roles');
const Employees = require('../../lib/Employees');

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
          addNewEmployee('api/employees');
          break;
        case "Update Employee Role":
          updateEmployeeRole('api/employees');
          break;
        case "Update Employee Manager":
          updateEmployeeManager('api/employees');
          break;
        case "Delete Employee":
          deleteCurrentEmployee('api/employees');
          break;

        case "View All Roles":
          let viewAllRoles = new Roles();
          viewAllRoles.fetchAllRoles('api/roles', "View All Roles");
          break;
        case "Add Role":
          addNewRole('api/roles', "role");
          break;
        case "Delete Role":
          deleteCurrentRole('api/roles');
          break;

        case "View All Departments":
          let viewAllDepartments = new Departments();
          viewAllDepartments.fetchAllDepartments('api/departments', "View All Departments");
          break;
        case "Add Department":
          addNewDepartment('api/departments', "department");
          break;
        case "Delete Department":
          deleteCurrentDepartment('api/departments');
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

addNewEmployee = async (path) => {
  let role = new Roles(); //declare role
  let employee = {};
  let roleId = 0;
  let managerId = 0;

  await getEmployee() //get data
    .then((data) => employee = new Employees(data.firstName, data.lastName, data.role, data.employeeManager))
    // .then(() => console.log(employee))
    .then(() => role.fetchRoleId('api/roles', employee.getRole())) //fetch role id
    .then((id_1) => roleId = id_1)
    // .then(() => console.log(roleId))
    .then(() => employee.fetchEmployeeId('api/employees', employee.getManager())) //fetch manager id; note input is the employeeManager
    .then((id_3) => managerId = id_3[0].id)
    // .then(() => console.log(managerId))
    .then(() => employee.addNewEmployee(path, employee.getEmployee(), roleId, managerId)) //post new employee
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

updateEmployeeRole = async (path) => {
  let role = new Roles(); //declare role

  let employee = {};
  let roleId = 0;
  let employeeId = 0;

  await getUpdateEmployeeRole() //get data
    .then((data) => employee = new Employees(data.employee.split(' ')[0], data.employee.split(' ')[1], data.role))
    // .then(() => console.log(employee, ))
    .then(() => role.fetchRoleId('api/roles', employee.getRole())) //fetch role id
    .then((id_1) => roleId = id_1)
    // .then(() => console.log('role = ', roleId))
    .then(() => employee.fetchEmployeeId('api/employees', employee.getFullName())) //fetch manager id; note input is the employee
    .then((id_3) => employeeId = id_3[0].id)
    // .then(() => console.log(employeeId))
    .then(() => employee.updateEmployeeRole(path, roleId, employeeId)) //update role
    .then(() => employee.renderUpdateRoleMessage(employee.getFullName(), employee.getRole())) //render message
    .then(() => getWhatToDo()); //start over
}

updateEmployeeManager = async (path) => {
  let role = new Roles(); //declare role

  let employee =  {};
  let roleId = 0;
  let managerId = 0;

  await getUpdateEmployeeManager() //get data
    .then((data) => employee = new Employees(data.employee.split(' ')[0], data.employee.split(' ')[1], "", data.employeeManager))
    // .then(() => console.log(employee))
    .then(() => role.fetchRoleId('api/roles', employee.getRole())) //fetch role id
    .then((id_1) => roleId = id_1)
    // .then(() => console.log(roleId))
    .then(() => employee.fetchEmployeeId('api/employees', employee.getManager())) //fetch manager id; note input is the employeeManager
    .then((id_3) => managerId = id_3[0].id)
    // .then(() => console.log(managerId, employee.getFullName()))
    .then(() => employee.updateEmployeeManager(path, employee.getFullName(), managerId)) //update role
    .then(() => employee.renderUpdateManagerMessage(employee.getFullName(), employee.getManager())) //render message
    .then(() => getWhatToDo()); //start over
}

renderTableOutput = (data, selection = "Hello") => {
  let lineBreak = `\n`;
  let title = `----------- ${selection} -----------`;

  console.log(`${blue}${lineBreak}${title}${white}${lineBreak}`);
  console.table(data);
  console.log(`${blue}${title}${white}`);
};

deleteCurrentEmployee = async (path) => {
  let employee = new Employees(); //declare employee

  await getDeleteEmployee()
  .then((data) => input = data)
  .then(() => employee.deleteEmployee(path, input))
  .then(() => employee.renderDeleteEmployeeMessage(input.employee))
  .then(() => getWhatToDo())
}

deleteCurrentRole = async (path) => {
  let role = new Roles(); //declare role

  await getDeleteRole()
  .then((data) => input = data)
  .then(() => role.deleteRole(path, input))
  .then(() => role.renderDeleteRoleMessage(input.role))
  .then(() => getWhatToDo())
}

deleteCurrentDepartment = async (path) => {
  let department = new Departments(); //declare department

  await getDeleteDepartment()
  .then((data) => input = data)
  .then(() => department.deleteDepartment(path, input))
  .then(() => department.renderDeleteDepartmentMessage(input.department))
  .then(() => getWhatToDo())
}

// console.log(banner);
getWhatToDo();