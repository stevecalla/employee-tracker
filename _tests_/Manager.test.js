const Manager = require("../lib/manager");

describe("Manager", () => {
  it("should be an instance of manager class", () => {
    expect(new Manager()).toBeInstanceOf(Manager);
  });

  it("should create an object keys first name, last name, full name, id, email role", () => {
    const manager = new Manager("Sarah", "Jones", 5, "sjones@gmail.com", 5);
    manager.getRole();

    expect(manager).toEqual({
      firstName: "Sarah",
      lastName: "Jones",
      fullName: "",
      id: 5,
      email: "sjones@gmail.com",
      role: "Manager",
      officeNumber: 5,
    });
  });

  it("should create an object with fullName", () => {
    const manager = new Manager("Sarah", "Jones");
    manager.getName();

    expect(manager.fullName).toEqual("Sarah Jones");
  });

  it("should create an object with role equal to employee", () => {
    const manager = new Manager("Sarah", "Jones");
    manager.getRole();

    expect(manager.role).toEqual("Manager");
  });
});
