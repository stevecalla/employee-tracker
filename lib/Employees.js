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
  async fetchEmployeeId(path, employeeManager, type) {
    // console.log(path, employeeManager);

    let getEmployee = await axios.get(`http://localhost:3001/${path}/${employeeManager}`);
    return getEmployee.data;
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

  //RENDER MESSAGE TO CONFIRM EMPLOYEE ADDED TO DATABASE
  renderAddEmployeeMessage(input, isCurrentEmployee) {
    if (isCurrentEmployee) {
      console.log(`\n${blue}Did not add ${input.firstName} ${input.lastName}. This employee already exists in the database.`);
    } else {
      console.log(`\n${blue}Added ${input.firstName} ${input.lastName} to the database.`);
    }
  }

}

module.exports = Employees;
