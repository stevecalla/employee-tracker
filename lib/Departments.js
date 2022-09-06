const axios = require('axios');

class Departments {
  constructor() {}

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
}

module.exports = Departments;

