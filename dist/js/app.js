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
          deleteRoleDeptEmp('api/employees', "delete", "employee");//todo
          break;

        case "View All Roles":
          let viewAllRoles = new Roles();
          viewAllRoles.fetchAllRoles('api/roles', "View All Roles");
          break;
        case "Add Role":
          getInfo(getRole, 'api/roles', "role");//todo
          break;
        case "Delete Role":
          deleteRoleDeptEmp('api/roles', "delete", "role");//todo
          break;

        case "View All Departments":
          let viewAllDepartments = new Departments();
          viewAllDepartments.fetchAllDepartments('api/departments', "View All Departments");
          break;
        case "Add Department":
          getInfo(getDepartment, 'api/departments', "department");//todo
          break;
        case "Delete Department":
          deleteRoleDeptEmp('api/departments', "delete", "department");//todo
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
  let employee = new Employees(); //declare manager

  let input = {};
  let roleId = 0;
  let managerId = 0;

  await getEmployee() //get data
    .then((data) => input = data)
    // .then(() => console.log(input))
    .then(() => role.fetchRoleId('api/roles', input.role, type)) //fetch role id
    .then((id_1) => roleId = id_1)
    // .then(() => console.log(roleId))
    .then(() => employee.fetchEmployeeId('api/employees', input.employeeManager, type)) //fetch manager id; note input is the employeeManager
    .then((id_3) => managerId = id_3[0].id)
    // .then(() => console.log(managerId))
    .then(() => employee.addNewEmployee(path, input, type, roleId, managerId)) //post new employee
    .then((isCurrentEmployee) => employee.renderAddEmployeeMessage(input, isCurrentEmployee)) //render message
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

// ASK USER TO INPUT EMPLOYEE, ROLE, DEPARTMENT OR ROLE UPDATE; PASS IN ASKQUESTION FUNCTION, TYPE OF QUESTION. RETURN TO THE GETWHATTODO FUNCTION
getInfo = async (askQuestions, path, type, classMethod) => {
  let input = {};
  let roleId = 0;
  let deptId = 0;
  let managerId = 0;

  console.log((askQuestions, path, type, classMethod));

  await askQuestions()
    .then((data) => input = data)
    // .then(() => console.log('INPUT = ', input))

    // .then(() => fetchRoleId('api/roles', input.role, type))

    //NEED ROLE ID TO ADD A NEW EMPLOYEE OR UPDATE ROLE
    .then(() => (type === 'employee' || type === "updateRole") ? classMethod.fetchRoleId('api/roles', input.role, type) : console.log('NOOOOO')) //section

    .then((id_1) => roleId = id_1)
    .then(() => fetchDepartmentId('api/departments', input.roleDepartment, type))
    .then((id_2) => deptId = id_2)

    .then(() => type === "updateRole" ? fetchManagerId('api/employees', input.employee, type) : type === 'employee' || type === 'updateRole' ? fetchManagerId('api/employees', input.employeeManager, type) : console.log('not necessary'))

    .then((id_3) => !id_3 ? managerId === undefined : managerId = id_3[0].id)

    // .then(() => console.log('ask question manager id = ', managerId))
    // .then(() => console.log('1 = ', type, input, '3 = ', roleId, '3a = ', managerId, '4 = ', path))

    .then(() => (type === "updateRole") ? (
      // axios.put(`http://localhost:3001/${path}`, {
      axios.put(`http://localhost:3001/${path}/update-role`, {
        id: managerId,
        role_id: roleId
        })
        .catch(function (error) {
          // console.log(error);
        })
      ) 
      : type === "updateManager" ? (
        // axios.put(`http://localhost:3001/${path}`, {
        axios.put(`http://localhost:3001/${path}/update-manager`, {
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
  // console.log('FETCH DEPT = ', path, department, type);
  // console.log('FETCH PATH = ', `http://localhost:3001/${path}/${department}`);

  if (type === 'role') {
    let dept = await axios.get(`http://localhost:3001/${path}/${department}`);

    return dept.data;
  }
}

//FETCHING MANAGER ID TO USE WHEN ADDING A NEW EMPLOYEE
fetchManagerId = async (path, employeeManager, type) => {
  // console.log('FETCH MGR = ', path, employeeManager, type);
  // console.log('FETCH PATH = ', `http://localhost:3001/${path}/${employeeManager}`);

  // if (type === 'employee' || type === 'updateRole' || type === 'updateManager') {
    let getEmployee = await axios.get(`http://localhost:3001/${path}/${employeeManager}`);

    let employee = getEmployee.data;
    return employee;
  // }
}

//FETCHING MANAGER ID TO USE WHEN ADDING A NEW EMPLOYEE
// fetchRoleId = async (path, role, type) => {
//   // console.log('FETCH ROLE = ', path, role, type);
//   // console.log('FETCH PATH = ', `http://localhost:3001/${path}/${role}`);

//   if (type === 'employee' || type === 'updateRole') {
//     let roleId = await axios.get(`http://localhost:3001/${path}/${role}`);
//     // let test =  await axios.get(`http://localhost:3001/api/roles/Lawyer`);
//     return roleId.data;
//   }
// }

postAllData = async (path, input, type, roleId, deptId, managerId) => {
  // console.log('POST = ', input, 'TYPE =', type, 'ROLE ID = ', roleId,  'DEPT ID = ', deptId, 'MGR ID = ', managerId);

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
    // case "employee":
    //   //CHECK IF EMPLOYEE ALREADY EXISTS
    //   let employeeExists = await fetchManagerId('api/employees', `${input.firstName} ${input.lastName}`, "employee");

    //   // console.log('employee exists = ', employeeExists);

    //   //IF EMPLOYEE DOES NOT EXIST THEN INSERT
    //   if (employeeExists === 0) {
    //     // console.log('bbbbb =', input.firstName, input.lastName, roleId, managerId)

    //     axios.post(`http://localhost:3001/api/employees`, {
    //       first_name: input.firstName,
    //       last_name: input.lastName,
    //       role_id: roleId,
    //       manager_id: managerId
    //     })
    //     .catch(function (error) {
    //       // console.log(error);
    //     });

    //   }
    //   break;
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

  // console.log(input, type, input.role, input.employee, inputToRender);
  
  type === "getRole" ? console.log(`\n${blue}Updated ${input.employee}'s role to ${input.role}`) : type === "delete" ? console.log(`\n${blue}Deleted ${input}`) : console.log(`\n${blue}Added ${inputToRender} to the database.`)
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

tableOutput = (data, selection = "Hello") => {
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

// module.exports = {
//   getWhatToDo
// };