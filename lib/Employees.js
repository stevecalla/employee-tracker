const axios = require('axios');

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

}

module.exports = Employees;
