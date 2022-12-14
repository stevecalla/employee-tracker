const axios = require("axios");
const { blue } = require("../../helpers/util");

class Roles {
  constructor(role, salary, roleDepartment) {
    (this.title = role),
    (this.salary = salary),
    (this.department = roleDepartment);
  }

  getRole() {
    return this;
  }

  getTitle() {
    return this.title;
  }

  getDepartment() {
    return this.department;
  }

  //USED BY APP.JS TO RENDER ROLES TABLE
  fetchAllRoles(path, selection) {
    axios
      .get(`http://localhost:3001/${path}`)
      .then(function (response) {
        renderTableOutput(response.data, selection);
      })
      .catch(function (error) {
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
  async fetchRoleId(path, role) {
    let roleId = await axios.get(`http://localhost:3001/${path}/${role}`);
    return roleId.data;
  }

  //DETERMINES IF ROLE EXISTS IN DATABASE
  async isCurrentRole(title) {
    let roleExists = await this.fetchRoleId("api/roles", title, "employee");

    if (roleExists) {
      return true;
    } else {
      return false;
    }
  }

  //ADD NEW ROLE
  async addNewRole(path, { title, salary }, deptId) {
    let roleExists = await this.isCurrentRole(title);

    //IF EMPLOYEE DOES NOT EXIST THEN INSERT
    if (roleExists) {
      return true;
    } else {
      axios.post(`http://localhost:3001/${path}`, {
        role: title,
        salary: salary,
        department_id: deptId,
      });
    }
  }

  //DELETE ROLE
  async deleteRole(path, { role, confirm }) {
    if (confirm) {
      axios
        .delete(`http://localhost:3001/${path}`, {
          data: { role: role },
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  //RENDER MESSAGE TO CONFIRM ROLE ADDED
  renderAddRoleMessage({ title }, isCurrentRole) {
    if (isCurrentRole) {
      console.log(
        `\n${blue}Did not add ${title}. This role already exists in the database.`
      );
    } else {
      console.log(`\n${blue}Added ${title} to the database.`);
    }
  }

  //RENDER MESSAGE TO CONFIRM ROLE DELETED
  renderDeleteRoleMessage(role) {
    console.log(`\n${blue}Deleted ${role} role`);
  }
}

module.exports = Roles;
