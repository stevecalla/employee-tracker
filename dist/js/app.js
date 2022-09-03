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
    .then(() => fetchRoleId('api/roles', input.role, type))
    .then((id_1) => roleId = id_1)
    .then(() => fetchDepartmentId('api/departments', input.roleDepartment, type))
    .then((id_2) => deptId = id_2)
    .then(() => fetchManagerId('api/employees', input.employeeManager, type))
    .then((id_3) => !id_3 ? managerId === undefined : managerId = id_3[0].id)
    .then(() => console.log('ask question manager id = ', managerId))
    .then(() => postAllData(path, input, type, roleId, deptId, managerId))
    .then(() => renderInput(input, type))
    .then(() => getWhatToDo());
};

//FETCHING DEPT ID TO USE WHEN ADDING A NEW ROLE
fetchDepartmentId = async (path, department, type) => {
  console.log('FETCH DEPT = ', path, department, type);
  console.log('FETCH PATH = ', `http://localhost:3001/${path}/${department}`);

  if (type === 'role') {
    let dept = await axios.get(`http://localhost:3001/${path}/${department}`);

    return dept.data;
  }
}

//FETCHING MANAGER ID TO USE WHEN ADDING A NEW EMPLOYEE
fetchManagerId = async (path, employeeManager, type) => {
  console.log('FETCH MGR = ', path, employeeManager, type);
  console.log('FETCH PATH = ', `http://localhost:3001/${path}/${employeeManager}`);

  if (type === 'employee') {
    let getEmployee = await axios.get(`http://localhost:3001/${path}/${employeeManager}`);
    // let test =  await axios.get(`http://localhost:3001/api/roles/Lawyer`);

    let employee = getEmployee.data;

    console.log('1) employee = ', getEmployee.data)

    return employee;
  }
}

//FETCHING MANAGER ID TO USE WHEN ADDING A NEW EMPLOYEE
fetchRoleId = async (path, role, type) => {
  console.log('FETCH ROLE = ', path, role, type);
  console.log('FETCH PATH = ', `http://localhost:3001/${path}/${role}`);

  if (type === 'employee') {
    let roleId = await axios.get(`http://localhost:3001/${path}/${role}`);
    // let test =  await axios.get(`http://localhost:3001/api/roles/Lawyer`);
    return roleId.data;
  }
}

postAllData = async (path, input, type, roleId, deptId, managerId) => {
  console.log('POST = ', input, 'TYPE =', type, 'ROLE ID = ', roleId,  'DEPT ID = ', deptId, 'MGR ID = ', managerId);

  switch (type) {
    case "role":
      let roleExists = await fetchRoleId('api/roles', input.role, "employee");

      if (roleExists === 0) {
        //todo move to put route
        db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${input.role}", "${input.salary}", "${deptId}")`);
      }
      break;
    case "employee":
      let employeeExists = await fetchManagerId('api/employees', `${input.firstName} ${input.lastName}`, "employee");

      if (employeeExists === 0) {

        //todo move to put route
        db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${input.firstName}", "${input.lastName}", "${roleId}", "${managerId}")`);
      }
      break;
    default:
      //CHECK TO SEE IF DEPARTMENT ALREADY EXISTS
      let deptExists = await fetchDepartmentId('api/departments', input.department, 'role');

      console.log('dept exists = ', deptExists);
      
      //IF DEPARTMENT DOES NOT EXIST THEN INSERT
      if (deptExists === 0) {

        console.log('bbbbb =', input.department)

        axios.post(`http://localhost:3001/api/departments`, {
          name: input.department,
        })
        //   .then(function (response) {
        //   // console.log(response);
        //   res.send('hello');
        // })
        .catch(function (error) {
          // console.log(error);
        });

      };

      break;
  }
}

//DETERMINE WHICH INPUT TO RENDER TO THE USER
renderInput = (input, type) => {
  let inputToRender = "";
  input.firstName ? inputToRender = `${input.firstName} ${input.lastName}` : input.department ? inputToRender = input.department : inputToRender = input.role

  type === "updateRole" ? console.log(`\n${blue}Updated ${input.employee}'s role to ${input.newRole}`) : console.log(`\n${blue}Added ${inputToRender} to the database.`)
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