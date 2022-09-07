const axios = require('axios');
const { blue } = require('../lib/util');

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

  //USED BY APP.JS TO RENDER DEPARTMENT BY SALARY
  async fetchDepartmentBySalary(path, selection, renderTitle) {
    let finalList = await axios.get(`http://localhost:3001/${path}/${selection}`);
    finalList = finalList.data;
    await tableOutput(finalList, renderTitle);
    getWhatToDo();
  }


  // renderAddedMessage(input) {
  //   let renderName = `${input.firstName} ${input.lastName}`;
  //   console.log(`\n${blue}Added ${renderName} to the database.`);
  // }

}

module.exports = Departments;

