const {
  getBasicInfo,
  getRole,
  getRoleQuestion,
  confirmContinue,
} = require("./runInquirer");
const { createMembers } = require("./createMembers.js");
const { createHTML } = require("./createHTML.js");
let teamMembers = [];

getTeamDetails = async (role = "Manager") => {
  let basicInfo = {};
  console.log(
    `\n\u001b[0;1mPLEASE ENTER THE ${role.toUpperCase()}\'S INFORMATION.`
  );
  await getBasicInfo()
    .then((answers) => (basicInfo = answers))
    .then(() => getRoleQuestion(role))
    .then((details) => createMembers(role, basicInfo, details, teamMembers))
    .then(() => confirmContinue())
    .then((confirm) => inputMoreMembers(confirm, role));
};

inputMoreMembers = async (confirm, role) => {
  confirm
    ? ((role = await getRole()), getTeamDetails(role.role))
    : await createHTML(teamMembers);
};

module.exports = {
  getTeamDetails,
};
