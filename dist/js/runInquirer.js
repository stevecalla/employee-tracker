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

getDeleteRoleDeptEmp = async (list) => {
  if (list === "department") {
    const deleteDepartment = await inquirer.prompt(questionsDeleteDepartment);
    return deleteDepartment;
  } else if (list === "employee") {
    const deleteEmployee = inquirer.prompt(questionsDeleteEmployee);
    return deleteEmployee;
  } else {
    const deleteRole = await inquirer.prompt(questionsDeleteRole);
    return deleteRole;
  };
};

module.exports = {
  getUserChoice,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
  getUpdateEmployeeManager,
  getDeleteRoleDeptEmp,
};
