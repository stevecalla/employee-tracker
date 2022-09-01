const inquirer = require("inquirer");
const {
  questionsUserChoice,
  questionsAddDepartment,
  questionsAddRole,
  questionsAddEmployee,
  questionsUpdateEmployeeRole,
} = require("./questions");

getUserChoice = () => {
  const start = inquirer.prompt(questionsUserChoice);
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
  getUserChoice,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
};
