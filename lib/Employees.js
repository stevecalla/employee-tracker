const axios = require('axios');
const { blue } = require('../lib/util');

class Employees {
  constructor() {}

  //USED BY APP.JS TO RENDER EMPLOYEES TABLE
  async fetchAllEmployees(path, selection) {
    await axios.get(`http://localhost:3001/${path}`)
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

  //USED BY QUESTIONS.JS TO RENDER LIST OF EMPLOYEES
  async fetchEmployeesList(path) {
    let employeeData = await axios.get(`http://localhost:3001/${path}`);
    return employeeData;
  }

  //USED BY APP.JS TO RENDER EMPLOYEES BY MANAGER
  async fetchEmployeeByManager(path, selection, renderTitle) {
    let finalList = await axios.get(`http://localhost:3001/${path}/${selection}`);
    finalList = finalList.data;
    await tableOutput(finalList, renderTitle);
    getWhatToDo();
  }

  //USED BY APP.JS TO RENDER EMPLOYEES BY MANAGER
  async fetchEmployeeByDepartment(path, selection, renderTitle) {
    let finalList = await axios.get(`http://localhost:3001/${path}/${selection}`);
    finalList = finalList.data;
    await tableOutput(finalList, renderTitle);
    getWhatToDo();
  }

  //FETCHING MANAGER ID TO USE WHEN ADDING A NEW EMPLOYEE, UPDATING EMPLOYEE MANAGER
  async fetchEmployeeId(path, employee, type) {
    // console.log(path, employee);

    let employeeId = await axios.get(`http://localhost:3001/${path}/${employee}`);

    // console.log('fetch employee id 1 = ', employeeId);
    // console.log('fetch employee id 2 = ', employeeId.data);

    return employeeId.data;
  }

  //DETERMINES IF EMPLOYEE EXISTS IN DATABASE
  async isCurrentEmployee(input) {
    let employeeExists = await this.fetchEmployeeId('api/employees', `${input.firstName} ${input.lastName}`, "employee");

    if (employeeExists) {
      return true;
    } else {
      return false;
    };
  }

  //ADD NEW EMPLOYEE
  async addNewEmployee(path, input, type, roleId, managerId) {
    let employeeExists = await this.isCurrentEmployee(input);

    //IF EMPLOYEE DOES NOT EXIST THEN INSERT
    if (employeeExists) {
      return true;
    } else {
      axios.post(`http://localhost:3001/${path}`, {
        first_name: input.firstName,
        last_name: input.lastName,
        role_id: roleId,
        manager_id: managerId
      });
    }
  }

  //UPDATE EMPLOYEE ROLE
  async updateEmployeeRole(path, roleId, employeeId) {
    axios.put(`http://localhost:3001/${path}/update-role`, {
      id: employeeId,
      role_id: roleId
    })
  }

  //UPDATE EMPLOYEE Manager
  async updateEmployeeManager(path, input, managerId) {
    axios.put(`http://localhost:3001/${path}/update-manager`, {
      employee: input.employee,
      manager_id: managerId
    })
  }

  //DELETE EMPLOYEE
  async deleteEmployee(path, input, list) {
    if (input.confirm) {
      axios.delete(`http://localhost:3001/${path}`, {
        data: { [list]: input[list] }
        })
        .catch(function (error) {
          // console.log(error);
        })
    }
  }

  //RENDER MESSAGE TO CONFIRM EMPLOYEE ADDED TO DATABASE
  renderAddEmployeeMessage(input, isCurrentEmployee) {
    if (isCurrentEmployee) {
      console.log(`\n${blue}Did not add ${input.firstName} ${input.lastName}. This employee already exists in the database.`);
    } else {
      console.log(`\n${blue}Added ${input.firstName} ${input.lastName} to the database.`);
    }
  }

  //RENDER MESSAGE TO CONFIRM ROLE UPDATED
  renderUpdateRoleMessage(input) {
    console.log(`\n${blue}Updated ${input.employee}'s role to ${input.role}`);
  }

  //RENDER MESSAGE TO CONFIRM MANAGER UPDATED
  renderUpdateManagerMessage({ employee, employeeManager}) {
    console.log(`\n${blue}Updated ${employee}'s manager to ${employeeManager}`);
  }

  //RENDER MESSAGE TO CONFIRM EMPLOYEE DELETED
  renderDeleteEmployeeMessage(input) {
    console.log(`\n${blue}Deleted ${input}`);
  }

}

module.exports = Employees;
