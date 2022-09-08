const axios = require("axios");
const { blue } = require("../../helpers/util");

class Employees {
  constructor(firstName, lastName, role, employeeManager) {
    (this.firstName = firstName),
    (this.lastName = lastName),
    (this.role = role),
    (this.employeeManager = employeeManager);
  }

  getEmployee() {
    return this;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getRole() {
    return this.role;
  }

  getManager() {
    return this.employeeManager;
  }

  //USED BY APP.JS TO RENDER EMPLOYEES TABLE
  async fetchAllEmployees(path, selection) {
    await axios
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

  //USED BY QUESTIONS.JS TO RENDER LIST OF EMPLOYEES
  async fetchEmployeesList(path) {
    let employeeData = await axios.get(`http://localhost:3001/${path}`);
    return employeeData;
  }

  //USED BY APP.JS TO RENDER EMPLOYEES BY MANAGER
  async fetchEmployeeByManager(path, selection, renderTitle) {
    let finalList = await axios.get(
      `http://localhost:3001/${path}/${selection}`
    );
    finalList = finalList.data;
    await renderTableOutput(finalList, renderTitle);
    getWhatToDo();
  }

  //USED BY APP.JS TO RENDER EMPLOYEES BY MANAGER
  async fetchEmployeeByDepartment(path, selection, renderTitle) {
    let finalList = await axios.get(
      `http://localhost:3001/${path}/${selection}`
    );
    finalList = finalList.data;
    await renderTableOutput(finalList, renderTitle);
    getWhatToDo();
  }

  //FETCHING MANAGER ID TO USE WHEN ADDING A NEW EMPLOYEE, UPDATING EMPLOYEE MANAGER
  async fetchEmployeeId(path, employee) {
    let employeeId = await axios.get(
      `http://localhost:3001/${path}/${employee}`
    );
    return employeeId.data;
  }

  //DETERMINES IF EMPLOYEE EXISTS IN DATABASE
  async isCurrentEmployee(firstName, lastName) {
    let employeeExists = await this.fetchEmployeeId(
      "api/employees",
      `${firstName} ${lastName}`,
      "employee"
    );

    if (employeeExists) {
      return true;
    } else {
      return false;
    }
  }

  //ADD NEW EMPLOYEE
  async addNewEmployee(path, { firstName, lastName }, roleId, managerId) {
    let employeeExists = await this.isCurrentEmployee(firstName, lastName);

    //IF EMPLOYEE DOES NOT EXIST THEN INSERT
    if (employeeExists) {
      return true;
    } else {
      axios.post(`http://localhost:3001/${path}`, {
        first_name: firstName,
        last_name: lastName,
        role_id: roleId,
        manager_id: managerId,
      });
    }
  }

  //UPDATE EMPLOYEE ROLE
  async updateEmployeeRole(path, roleId, employeeId) {
    axios.put(`http://localhost:3001/${path}/update-role`, {
      id: employeeId,
      role_id: roleId,
    });
  }

  //UPDATE EMPLOYEE Manager
  async updateEmployeeManager(path, employee, managerId) {
    axios.put(`http://localhost:3001/${path}/update-manager`, {
      employee: employee,
      manager_id: managerId,
    });
  }

  //DELETE EMPLOYEE
  async deleteEmployee(path, { employee, confirm }) {
    if (confirm) {
      axios
        .delete(`http://localhost:3001/${path}`, {
          data: { employee: employee },
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  //RENDER MESSAGE TO CONFIRM EMPLOYEE ADDED TO DATABASE
  renderAddEmployeeMessage({ firstName, lastName }, isCurrentEmployee) {
    if (isCurrentEmployee) {
      console.log(
        `\n${blue}Did not add ${firstName} ${lastName}. This employee already exists in the database.`
      );
    } else {
      console.log(`\n${blue}Added ${firstName} ${lastName} to the database.`);
    }
  }

  //RENDER MESSAGE TO CONFIRM ROLE UPDATED
  renderUpdateRoleMessage(employee, role) {
    console.log(employee, role);
    console.log(`\n${blue}Updated ${employee}'s role to ${role}`);
  }

  //RENDER MESSAGE TO CONFIRM MANAGER UPDATED
  renderUpdateManagerMessage(employee, employeeManager) {
    console.log(`\n${blue}Updated ${employee}'s manager to ${employeeManager}`);
  }

  //RENDER MESSAGE TO CONFIRM EMPLOYEE DELETED
  renderDeleteEmployeeMessage(employee) {
    console.log(`\n${blue}Deleted ${employee}`);
  }
}

module.exports = Employees;
