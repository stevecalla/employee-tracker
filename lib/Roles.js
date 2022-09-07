const axios = require('axios');
const { blue } = require('../lib/util');

class Roles {
  constructor() {}

  //USED BY APP.JS TO RENDER ROLES TABLE
  fetchAllRoles(path, selection) {
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

  //USED BY QUESTIONS.JS TO RENDER LIST OF ROLES
  async fetchRolesList(path) {
    let rolesData = await axios.get(`http://localhost:3001/${path}`);
    return rolesData;
  }

  //FETCHING ROLE ID TO USE WHEN ADDING A NEW EMPLOYEE OR UPDATING EMPLOYEE ROLE
  async fetchRoleId(path, role, type) {
      let roleId = await axios.get(`http://localhost:3001/${path}/${role}`);
      return roleId.data;
  }


  // renderAddedMessage(input) {
  //   let renderName = `${input.firstName} ${input.lastName}`;
  //   console.log(`\n${blue}Added ${renderName} to the database.`);
  // }
  
}

module.exports = Roles;
