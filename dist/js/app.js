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
          getInfo(getUpdateEmployeeRole,'api/employees', "updateRole");
          // updateEmployeeRole();
          break;
        case "Update Employee Manager":
          getInfo(getUpdateEmployeeManager,'api/employees', "updateManager");
          // updateEmployeeRole();
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
        case "View Employees by Manager":
          fetchEmployeeBySegmentData('api/employees', selection, "Manager");
          break;
        case "View Employees by Department":
          fetchEmployeeBySegmentData('api/employees', selection, "Department");
          break;
        case "View Department by Salary":
          fetchEmployeeBySegmentData('api/employees', selection, "Department");
          break;
        case "Delete Role":
          deleteRoleDeptEmp('api/roles', "delete", "role");
          break;
        case "Delete Department":
          deleteRoleDeptEmp('api/departments', "delete", "department");
          break;
        case "Delete Employee":
          deleteRoleDeptEmp('api/employees', "delete", "employee");
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
    .then(() => type === "updateRole" ? fetchManagerId('api/employees', input.employee, type) : fetchManagerId('api/employees', input.employeeManager, type) )
    .then((id_3) => !id_3 ? managerId === undefined : managerId = id_3[0].id)
    .then(() => console.log('ask question manager id = ', managerId))
    .then(() => console.log('1 = ', type, input, '3 = ', roleId, '3a = ', managerId, '4 = ', path))
    .then(() => type === "updateRole" ? (
      axios.put(`http://localhost:3001/${path}`, {
        id: managerId,
        role_id: roleId
        })
        .catch(function (error) {
          // console.log(error);
        })
      ) 
      : type === "updateManager" ? (
        axios.put(`http://localhost:3001/${path}`, {
          employee: input.employee,
          manager_id: managerId
          })
          .catch(function (error) {
            // console.log(error);
          })
      ) : postAllData(path, input, type, roleId, deptId, managerId)
      )
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

  if (type === 'employee' || type === 'updateRole' || type === 'updateManager') {
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

  if (type === 'employee' || type === 'updateRole') {
    let roleId = await axios.get(`http://localhost:3001/${path}/${role}`);
    // let test =  await axios.get(`http://localhost:3001/api/roles/Lawyer`);
    return roleId.data;
  }
}

postAllData = async (path, input, type, roleId, deptId, managerId) => {
  console.log('POST = ', input, 'TYPE =', type, 'ROLE ID = ', roleId,  'DEPT ID = ', deptId, 'MGR ID = ', managerId);

  switch (type) {
    case "role":
      //CHECK IF ROLE ALREADY EXISTS
      let roleExists = await fetchRoleId('api/roles', input.role, "employee");

      // console.log('role exists = ', roleExists);

      //IF ROLE DOES NOT EXIST THEN INSERT
      if (roleExists === 0) {
        // console.log('bbbbb =', input.role, input.salary, deptId)

        axios.post(`http://localhost:3001/api/roles`, {
          role: input.role,
          salary: input.salary,
          department_id: deptId
        })
        .catch(function (error) {
          // console.log(error);
        });
      }
      break;
    case "employee":
      //CHECK IF EMPLOYEE ALREADY EXISTS
      let employeeExists = await fetchManagerId('api/employees', `${input.firstName} ${input.lastName}`, "employee");

      // console.log('employee exists = ', employeeExists);

      //IF EMPLOYEE DOES NOT EXIST THEN INSERT
      if (employeeExists === 0) {
        // console.log('bbbbb =', input.firstName, input.lastName, roleId, managerId)

        axios.post(`http://localhost:3001/api/employees`, {
          first_name: input.firstName,
          last_name: input.lastName,
          role_id: roleId,
          manager_id: managerId
        })
        .catch(function (error) {
          // console.log(error);
        });

      }
      break;
    default:
      //CHECK IF DEPARTMENT ALREADY EXISTS
      let deptExists = await fetchDepartmentId('api/departments', input.department, 'role');

      // console.log('dept exists = ', deptExists);

      //IF DEPARTMENT DOES NOT EXIST THEN INSERT
      if (deptExists === 0) {

        // console.log('bbbbb =', input.department)

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
  
  input.firstName ? inputToRender = `${input.firstName} ${input.lastName}` : input.department ? inputToRender = input.department : inputToRender = input.role;

  console.log(input, type, input.role, input.employee, inputToRender);
  
  type === "updateRole" ? console.log(`\n${blue}Updated ${input.employee}'s role to ${input.role}`) : type === "delete" ? console.log(`\n${blue}Deleted ${input}`) : console.log(`\n${blue}Added ${inputToRender} to the database.`)
}

//RENDER EMPLOYEE BY MANAGER OR EMPLOYEE BY DEPARTMENT
fetchEmployeeBySegmentData = async (path, selection, listName) => {
  let finalList = await axios.get(`http://localhost:3001/${path}/${selection}`);
  // console.log(finalList.data);
  finalList = finalList.data;
  await tableOutput(finalList, selection);
  getWhatToDo();

  // axios.get(`http://localhost:3001/${path}`)
  // .then(function (response) {
  //   // console.log(response.data);
  //   let listNameLowerCase = listName.toLowerCase();
  //   console.log("list name = ", listName, listNameLowerCase);

  //   let employeeByManger = response.data.map(element => (
  //     {
  //       sortKey: listName === "Department" ? element.Department: element.Manager.split(' ')[1],
  //       [listNameLowerCase]: listName === "Department" ? element.Department: element.Manager, 
  //       employee: `${element.First_Name} ${element.Last_Name}`
  //     })
  //   );
  //   console.log(employeeByManger);
  //   let sortManager = sortUtility(employeeByManger, "managerLastName");
  //   console.log(sortManager);
  //   let finalList = sortManager.map(element => (
  //     {
  //       [listName]: listName === "Department" ? element.department: element.manager,
  //       Employee: element.employee
  //     }
  //   ))
  //   tableOutput(finalList, selection);
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .then(function () {
  //   getWhatToDo();
  // });
}

//UTILITY FUNCTIONS
function sortUtility(listToSort) {
  let sortedList = listToSort.sort(function (a, b) {
    const nameA = a.sortKey.toUpperCase(); //ignore upper and lowercase
    const nameB = b.sortKey.toUpperCase(); //ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    //names must be equal
    return 0;
  });
  return sortedList;
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

deleteRoleDeptEmp = async (path, type, list) => {
  await getDeleteRoleDeptEmp(list)
    .then((data) => input = data)
    // .then(() => console.log(input, input.confirm, input[list]))
    .then(() => {if (input.confirm) {
      axios.delete(`http://localhost:3001/${path}`, {
        // data: { name: input.department }
        data: { [list]: input[list] }
        })
        .catch(function (error) {
          // console.log(error);
        })
    }})
    // .then(() => renderInput(input.department, type))
    .then(() => renderInput(input[list], type))
    .then(() => getWhatToDo())
}

// console.log(banner);
getWhatToDo();

module.exports = {
  // getWhatToDo,
};