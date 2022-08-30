const inquirer = require("inquirer");
const {
  questionsRole,
  questionsBasicInfo,
  questionsManager,
  questionsEngineer,
  questionsIntern,
  questionsContinue,
} = require("./questions");

getBasicInfo = () => {
  const employeeAnswers = inquirer.prompt(questionsBasicInfo);
  return employeeAnswers;
};

getRole = () => {
  const selectRole = inquirer.prompt(questionsRole);
  return selectRole;
};

getManagerInfo = () => {
  const managerInfo = inquirer.prompt(questionsManager);
  return managerInfo;
};

getEngineerInfo = () => {
  const engineerInfo = inquirer.prompt(questionsEngineer);

  return engineerInfo;
};

getInternInfo = () => {
  const internInfo = inquirer.prompt(questionsIntern);
  return internInfo;
};

getRoleQuestion = (role) => {
  let employeeDetails = {};
  switch (role) {
    case "Engineer":
      employeeDetails = getEngineerInfo();
      break;
    case "Intern":
      employeeDetails = getInternInfo();
      break;
    default:
      employeeDetails = getManagerInfo();
  }
  return employeeDetails;
};

confirmContinue = async () => {
  const confirm = await inquirer.prompt(questionsContinue);
  return confirm.isContinue;
};

module.exports = {
  getBasicInfo,
  getRole,
  getManagerInfo,
  getEngineerInfo,
  getInternInfo,
  getRoleQuestion,
  confirmContinue,
};
