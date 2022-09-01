const inquirer = require("inquirer");
const {
  questionsStart,
  questionsAddDepartment,
  questionsAddRole,
  questionsAddEmployee,
  questionsUpdateEmployeeRole,
} = require("./questions");

getStart = () => {
  const start = inquirer.prompt(questionsStart);
  return start;
};

getDepartment = () => {
  const addDepartment = inquirer.prompt(questionsAddDepartment);
  return addDepartment;
};

getRole = () => {
  const addRole = inquirer.prompt(questionsAddRole);
  return addRole;
};

getEmployee = () => {
  const addEmployee = inquirer.prompt(questionsAddEmployee);
  return addEmployee;
};

getUpdateEmployeeRole = () => {
  const updateEmployeeRole = inquirer.prompt(questionsUpdateEmployeeRole);
  return updateEmployeeRole;
};

module.exports = {
  getStart,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
};
