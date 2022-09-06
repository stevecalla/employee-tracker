const axios = require('axios');

class Departments {
  constructor() {}

  //USED BY APP.JS TO RENDER DEPARTMENT TABLE
  fetchAllDepartments(path, selection) {
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

  //USED BY QUESTIONS.JS TO RENDER LIST OF DEPARTMENTS
  async fetchDepartmentsList(path) {
    let departmentsData = await axios.get(`http://localhost:3001/${path}`);
    return departmentsData;
  }

}

module.exports = Departments;

