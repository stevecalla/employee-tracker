const inquirer = require("inquirer");
const {
  questionsUserChoice,
  questionsAddDepartment,
  questionsAddRole,
  questionsAddEmployee,
  questionsUpdateEmployeeRole,
  questionsDeleteRole,
  questionsDeleteDepartment,
  questionsDeleteEmployee,
} = require("./questions");

getUserChoice = async () => {
  const start = await inquirer.prompt(questionsUserChoice);
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

getDeleteRole = async () => {
  const deleteRole = await inquirer.prompt(questionsDeleteRole);
  return deleteRole;
};

getDeleteDepartment = async () => {
  const deleteDepartment = await inquirer.prompt(questionsDeleteDepartment);
  return deleteDepartment;
};

getDeleteEmployee = async () => {
  const deleteDepartment = await inquirer.prompt(questionsDeleteEmployee);
  return deleteDepartment;
};

module.exports = {
  getUserChoice,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
  getDeleteRole,
  getDeleteDepartment,
  getDeleteEmployee,
};
