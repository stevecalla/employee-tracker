const Manager = require("../../lib/Manager.js");
const Engineer = require("../../lib/Engineer.js");
const Intern = require("../../lib/Intern.js");

createMembers = (role, member, employeeDetails, teamMembers) => {
  switch (role) {
    case "Engineer":
      const engineer = new Engineer(
        member.firstName,
        member.lastName,
        member.employeeId,
        member.emailAddress,
        employeeDetails.gitHubUserName
      );
      engineer.getRole();
      teamMembers.push(engineer); //push employees into an array
      break;
    case "Intern":
      const intern = new Intern(
        member.firstName,
        member.lastName,
        member.employeeId,
        member.emailAddress,
        employeeDetails.internSchool
      );
      intern.getRole();
      teamMembers.push(intern); //push employees into an array
      break;
    default:
      const manager = new Manager(
        member.firstName,
        member.lastName,
        member.employeeId,
        member.emailAddress,
        employeeDetails.officeNumber
      );
      manager.getRole();
      teamMembers.push(manager); //push employees into an array
  }
  return teamMembers;
};

module.exports = {
  createMembers,
};
