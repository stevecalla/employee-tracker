const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(firstName, lastName, id, email, gitHubUserName) {
    super(firstName, lastName, id, email);
    this.gitHubUserName = gitHubUserName;
  }

  getGitHubUserName() {
    return this.gitHubUserName;
  }

  getRole() {
    return (this.role = "Engineer");
  }
}

module.exports = Engineer;
