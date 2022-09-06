const Employee = require("../lib/employee");

describe("Employee", () => {
  it("should be an instance of employee class", () => {
    expect(new Employee()).toBeInstanceOf(Employee);
  });

  it("should create object keys first name, last name, full name, id, email role", () => {
    const employee = new Employee("Sarah", "Jones", 5, "sjones@gmail.com");

    expect(employee).toEqual({
      firstName: "Sarah",
      lastName: "Jones",
      fullName: "",
      id: 5,
      email: "sjones@gmail.com",
      role: "",
    });
  });

  it("should create an object with fullName", () => {
    const employee = new Employee("Sarah", "Jones");
    employee.getName();

    expect(employee.fullName).toEqual("Sarah Jones");
  });

  it("should create an object with role equal to employee", () => {
    const employee = new Employee("Sarah", "Jones");
    employee.getRole();

    expect(employee.role).toEqual("Employee");
  });
});
