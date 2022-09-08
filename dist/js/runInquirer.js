const inquirer = require("inquirer");
const {
  questionsUserChoice,
  questionsAddDepartment,
  questionsAddRole,
  questionsAddEmployee,
  questionsUpdateEmployeeRole,
  questionsUpdateEmployeeManager,
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

getEmployee = async () => {
  const addEmployee = await inquirer.prompt(questionsAddEmployee);
  return addEmployee;
};

getUpdateEmployeeRole = () => {
  const updateEmployeeRole = inquirer.prompt(questionsUpdateEmployeeRole);
  return updateEmployeeRole;
};

getUpdateEmployeeManager = () => {
  const updateEmployeeManager = inquirer.prompt(questionsUpdateEmployeeManager);
  return updateEmployeeManager;
};

getDeleteEmployee = () => {
  const deleteEmployee = inquirer.prompt(questionsDeleteEmployee);
  return deleteEmployee;
};

getDeleteRole = () => {
  const deleteRole = inquirer.prompt(questionsDeleteRole);
  return deleteRole;
};

getDeleteDepartment = () => {
  const deleteDepartment = inquirer.prompt(questionsDeleteDepartment);
  return deleteDepartment;
};

module.exports = {
  getUserChoice,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
  getUpdateEmployeeManager,
  getDeleteEmployee,
  getDeleteRole,
  getDeleteDepartment,
};
