const Intern = require("../lib/intern.js");

describe("Intern", () => {
  it("should be an instance of intern class", () => {
    expect(new Intern()).toBeInstanceOf(Intern);
  });

  it("should create an object keys first name, last name, full name, id, email role", () => {
    const intern = new Intern(
      "Sarah",
      "Jones",
      5,
      "sjones@gmail.com",
      "Oxford"
    );
    intern.getRole();

    expect(intern).toEqual({
      firstName: "Sarah",
      lastName: "Jones",
      fullName: "",
      id: 5,
      email: "sjones@gmail.com",
      role: "Intern",
      internSchool: "Oxford",
    });
  });

  it("should create an object with fullName", () => {
    const intern = new Intern("Sarah", "Jones");
    intern.getName();

    expect(intern.fullName).toEqual("Sarah Jones");
  });

  it("should create an object with role equal to employee", () => {
    const intern = new Intern("Sarah", "Jones");
    intern.getRole();

    expect(intern.role).toEqual("Intern");
  });
});
