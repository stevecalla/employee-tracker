class Employee {
  constructor(firstName, lastName, id, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = "";
    this.id = id;
    this.email = email;
    this.role = "";
  }

  getName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
    return this.fullName;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return (this.role = "Employee");
  }
}

module.exports = Employee;
