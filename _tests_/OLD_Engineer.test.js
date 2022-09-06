const Engineer = require("../lib/engineer.js");

describe("Engineer", () => {
  it("should be an instance of engineer class", () => {
    expect(new Engineer()).toBeInstanceOf(Engineer);
  });

  it("should create an object keys first name, last name, full name, id, email role", () => {
    const engineer = new Engineer(
      "Sarah",
      "Jones",
      5,
      "sjones@gmail.com",
      "sjones"
    );
    engineer.getRole();

    expect(engineer).toEqual({
      firstName: "Sarah",
      lastName: "Jones",
      fullName: "",
      id: 5,
      email: "sjones@gmail.com",
      role: "Engineer",
      gitHubUserName: "sjones",
    });
  });

  it("should create an object with fullName", () => {
    const engineer = new Engineer("Sarah", "Jones");
    engineer.getName();

    expect(engineer.fullName).toEqual("Sarah Jones");
  });

  it("should create an object with role equal to employee", () => {
    const engineer = new Engineer("Sarah", "Jones");
    engineer.getRole();

    expect(engineer.role).toEqual("Engineer");
  });
});
