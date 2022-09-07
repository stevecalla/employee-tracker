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
    // console.log('fetch role = ', path, role, type)
    let roleId = await axios.get(`http://localhost:3001/${path}/${role}`);
    // console.log('role data fetch = ', role.data)
    return roleId.data;
  }

  //DETERMINES IF ROLE EXISTS IN DATABASE
  async isCurrentRole(input) {
    let roleExists = await this.fetchRoleId('api/roles', input.role, "employee");

    if (roleExists) {
      return true;
    } else {
      return false;
    };
  }

  //ADD NEW ROLE
  async addNewRole(path, input, deptId) {
    let roleExists = await this.isCurrentRole(input);

    //IF EMPLOYEE DOES NOT EXIST THEN INSERT
    if (roleExists) {
      return true;
    } else {
      axios.post(`http://localhost:3001/${path}`, {
        role: input.role,
        salary: input.salary,
        department_id: deptId
      })
    }
  }

  renderAddRoleMessage({ role }) {
    console.log(`\n${blue}Added ${role} to the database.`);
  }
  
}

module.exports = Roles;
