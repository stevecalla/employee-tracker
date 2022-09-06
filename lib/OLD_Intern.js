const Employee = require("./Employee");

class Intern extends Employee {
  constructor(firstName, lastName, id, email, school) {
    super(firstName, lastName, id, email);
    this.internSchool = school;
  }

  getSchool() {
    return this.internSchool;
  }

  getRole() {
    return (this.role = "Intern");
  }
}

module.exports = Intern;
