const {
  getUserChoice,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
} = require("./runInquirer");
const { banner } = require("./banner");
const { blue, white } = require("../../lib/util");
const consoleTable = require('console.table');
const { seedData } = require('../../db/testData');
const axios = require('axios');
const { db } = require('../../db/database');

//ASK USER WHAT ACTION TO PERFORM
getWhatToDo = async () => {
  await getUserChoice()
    .then((choices) => choices.userSelection) //passes selection to next then statement
    .then((selection) => { //determine which question or data to display
      switch (selection) {
        case "View All Employees":
          fetchAllData('api/employees', selection);
          break;
        case "Add Employee":
          getInfo(getEmployee, 'api/employees', "employee");
          break;
        case "Update Employee Role":
          getInfo(getUpdateEmployeeRole, "updateRole");
          break;
        case "View All Roles":
          fetchAllData('api/roles', selection);
          break;
        case "Add Role":
          getInfo(getRole, 'api/roles', "role");
          break;
        case "View All Departments":
          fetchAllData('api/departments', selection);
          break;
        case "Add Department":
          getInfo(getDepartment, 'api/departments', "department");
          break;
        default:
          console.log(selection)
          // process.exit();
    }});
};

// ASK USER TO INPUT EMPLOYEE, ROLE, DEPARTMENT OR ROLE UPDATE; PASS IN ASKQUESTION FUNCTION, TYPE OF QUESTION. RETURN TO THE GETWHATTODO FUNCTION
getInfo = async (askQuestions, path, type) => {
  let input = {};
  let roleId = 0;
  let deptId = 0;
  let managerId = 0;

  await askQuestions()
    .then((data) => input = data)
    // .then(() => console.log('INPUT = ', input))
    .then(() => fetchRoleId('api/employees', input.role, type))
    .then((id_1) => roleId = id_1)
    .then(() => fetchDepartmentId('api/departments', input.roleDepartment, type))
    .then((id_2) => deptId = id_2)
    .then(() => fetchManagerId('api/employees', input.employeeManager, type))
    .then((id_3) => managerId = id_3)
    .then(() => postAllData(path, input, type, roleId, deptId, managerId))
    .then(() => renderInput(input, type))
    .then(() => getWhatToDo());
};

//DETERMINE WHICH INPUT TO RENDER TO THE USER
renderInput = (input, type) => {
  let inputToRender = "";
  input.firstName ? inputToRender = `${input.firstName} ${input.lastName}` : input.department ? inputToRender = input.department : inputToRender = input.role

  type === "updateRole" ? console.log(`\n${blue}Updated ${input.employee}'s role to ${input.newRole}`) : console.log(`\n${blue}Added ${inputToRender} to the database.`)
}

fetchDepartmentId = async (path, department, type) => {
  console.log('FETCH DEPT = ', path, department, type);

  // if (path === 'api/roles') {
  if (type === 'role') {
    let result = await db.awaitQuery(`SELECT id FROM departments WHERE name = "${department}"`);
    console.log('2 = ', result, result.length, result[0].id);
    return result[0].id;
  }
}

fetchManagerId = async (path, employeeManager, type) => {
  console.log('FETCH MGR = ', path, employeeManager, type);
  
  // if (path === 'api/employees') {
  if (type === 'employee') {

    let firstName = employeeManager.split(' ')[0];
    let lastName = employeeManager.split(' ')[1];

    let result = await db.awaitQuery(`SELECT manager_id FROM employees WHERE first_name = "${firstName}" AND last_name = "${lastName}"`);

    console.log('2 = ', result, result.length, result[0].manager_id);

    return result[0].manager_id;
  }
}

fetchRoleId = async (path, role, type) => {
  console.log('FETCH ROLE = ', path, role, type);
  // if (path === 'api/employees') {
  if (type === 'employee') {
    let result = await db.awaitQuery(`SELECT id FROM roles WHERE title = "${role}"`);
    console.log('2 = ', result, result.length, result[0].id);
    return result[0].id;
  }
}

postAllData = async (path, input, type, roleId, deptId, managerId) => {
  console.log('POST = ', input, 'TYPE =', type, 'ROLE ID = ', roleId,  'DEPT ID = ', deptId, 'MGR ID = ', managerId);

  switch (type) {
    case "role":
      let roleExists = await db.awaitQuery(`SELECT * FROM roles WHERE title = "${input.role}"`);

      if (roleExists.length === 0) {
        db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${input.role}", "${input.salary}", "${deptId}")`);
      }
      //todo add department from query
      break;
    case "employee":
      let employeeExists = await db.awaitQuery(`SELECT * FROM employees WHERE first_name = "${input.firstName}" AND last_name = "${input.lastName}"`);

      if (employeeExists.length === 0) {
        db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${input.firstName}", "${input.lastName}", "${roleId}", "${managerId}")`);
      }

      // db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${input.firstName}", "${input.lastName}", "${roleId}", "${managerId}")`);

      //todo need manager id, need role id
      //todo delete employee id, delete email
      break;
    default:
      let deptExists = await db.awaitQuery(`SELECT * FROM departments WHERE name = "${input.department}"`);
      
      if (deptExists.length === 0) {
        db.query(`INSERT INTO departments(name) VALUES ("${input.department}")`);
      };
      break;
  }
}

fetchAllData = (path, selection) => {
  axios.get(`http://localhost:3001/${path}`)
  .then(function (response) {
    // handle success
    tableOutput(response.data, selection);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    getWhatToDo();
  });
}

tableOutput = (data = seedData, selection = "Hello") => {
  let lineBreak = `\n`;
  let title = `----------- ${selection} -----------`;
  console.log(`${blue}${lineBreak}${title}${white}${lineBreak}`);
  console.table(data);
  console.log(`${blue}${title}${white}`);
};

// console.log(banner);
getWhatToDo();

module.exports = {
  // getWhatToDo,
};


// console.log('FETCH PATH = ', `http://localhost:3001/${path}/${role}`);
  // axios.get(`http://localhost:3001/${path}/${role}`)
  // .then(function (response) {
  // axios.get(`http://localhost:3001/api/roles/Lawyer`)
  // .then(function (response) {    
  //   // handle success
  //   console.log('FETCH ROLE RESPONSE = ', response);
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .then(function () {
  //   console.log('FETCH ROLE LAST STEP = ', response);
  //   // getWhatToDo();
  // });