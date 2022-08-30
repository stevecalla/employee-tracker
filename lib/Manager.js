const Employee = require("./Employee");

class Manager extends Employee {
  constructor(firstName, lastName, id, email, officeNumber) {
    super(firstName, lastName, id, email);
    this.officeNumber = officeNumber;
  }

  getRole() {
    return (this.role = "Manager");
  }

  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;
