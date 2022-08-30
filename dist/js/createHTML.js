const fs = require("fs").promises;
const {
  managerTemplate,
  engineerTemplate,
  internTemplate,
  managerIcon,
  engineerIcon,
  internIcon,
} = require("../../src/roleTemplate.html");
const { profileTemplate } = require("../../src/profileTemplate.html");
const { homeTemplate } = require("../../src/homeTemplate.html");

const WriteHTML = require("./writeHTML.js");

createHTML = (teamMembers) => {
  let iconHTML = "";
  let roleHTML = "";
  let membersHTML = "";

  for (member of teamMembers) {
    switch (member.role) {
      case "Engineer":
        (iconHTML = engineerIcon), (roleHTML = engineerTemplate(member));
        membersHTML += profileTemplate(roleHTML, iconHTML, member);
        break;

      case "Intern":
        (iconHTML = internIcon), (roleHTML = internTemplate(member));
        membersHTML += profileTemplate(roleHTML, iconHTML, member);
        break;

      default:
        (iconHTML = managerIcon), (roleHTML = managerTemplate(member));
        membersHTML += profileTemplate(roleHTML, iconHTML, member);
        break;
    }
  }

  writeHTML(membersHTML);

  return membersHTML;
};

writeHTML = (membersHTML) => {
  const writeHTML = new WriteHTML();
  writeHTML.write("./index.html", homeTemplate(membersHTML));
};

module.exports = {
  createHTML,
};
