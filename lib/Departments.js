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

  //FETCHING DEPT ID TO USE WHEN ADDING A NEW ROLE
  async fetchDepartmentId(path, department, type) {
    // console.log('fetch dept = ', path, department, type);
    
    // if (type === 'role') {
    let dept = await axios.get(`http://localhost:3001/${path}/${department}`);
    return dept.data;
    // }
  }

  //USED BY APP.JS TO RENDER DEPARTMENT BY SALARY
  async fetchDepartmentBySalary(path, selection, renderTitle) {
    let finalList = await axios.get(`http://localhost:3001/${path}/${selection}`);
    finalList = finalList.data;
    await tableOutput(finalList, renderTitle);
    getWhatToDo();
  }

  //DETERMINES IF DEPARTMENT EXISTS IN DATABASE
  async isCurrentDepartment(input) {
    let departmentExists = await this.fetchDepartmentId('api/departments', input.department, "departments");

    if (departmentExists) {
      return true;
    } else {
      return false;
    };
  }

  //ADD NEW DEPARTMENT
  async addNewDepartment(path, input, deptId) {
    // console.log('new department = ', path, input);

    let departmentExists = await this.isCurrentDepartment(input);

    // console.log(departmentExists);

    //IF EMPLOYEE DOES NOT EXIST THEN INSERT
    if (departmentExists) {
      return true;
    } else {
      axios.post(`http://localhost:3001/${path}`, {
        name: input.department,
      })
    }
  }

  //DELETE DEPARTMENT
  async deleteDepartment(path, input, list) {
    if (input.confirm) {
      axios.delete(`http://localhost:3001/${path}`, {
        data: { [list]: input[list] }
        })
        .catch(function (error) {
          // console.log(error);
        })
    }
  }

  //RENDER MESSAGE TO CONFIRM DEPARTMENT ADDED
  renderAddDepartmentMessage({ department }, isCurrentDepartment) {
    if (isCurrentDepartment) {
      console.log(`\n${blue}Did not add ${department}. This department already exists in the database.`);
    } else {
      console.log(`\n${blue}Added ${department} to the database.`);
    }
  }

  //RENDER MESSAGE TO CONFIRM DEPARTMENT DELETED
  renderDeleteDepartmentMessage(input) {
    console.log(`\n${blue}Deleted ${input} department`);
  }

}

module.exports = Departments;

