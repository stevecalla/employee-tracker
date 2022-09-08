const Manager = require("../lib/manager.js");
const Engineer = require("../lib/engineer.js");
const Intern = require("../lib/intern.js");
const { createMembers } = require("../dist/js/createMembers");

describe("Create HTML", () => {
  it("create team members array with length 1 and 2", () => {
    let teamMembers = [];
    const manager = new Manager("Steve", "Calla", 1, "calla@gmail.com", 10);
    teamMembers.push(manager);

    expect(teamMembers).toHaveLength(1);

    const engineer = new Engineer("Steve", "Calla", 1, "calla@gmail.com", 10);
    teamMembers.push(engineer);

    expect(teamMembers).toHaveLength(2);
  });

  it("should team member array to contain manager information with a role and full name", () => {
    let teamMembers = [];

    const manager = new Manager(
      "Steve",
      "Calla",
      1,
      "callasteven@gmail.com",
      10
    );
    manager.getRole();
    manager.getName();

    teamMembers.push(manager);

    expect(teamMembers).toEqual([
      {
        email: "callasteven@gmail.com",
        firstName: "Steve",
        fullName: "Steve Calla",
        id: 1,
        lastName: "Calla",
        officeNumber: 10,
        role: "Manager",
      },
    ]);
  });

  it("should team member array to contain manager, engineer, intern, information with a role and full name", () => {
    let teamMembers = [];

    const manager = new Manager(
      "Steve",
      "Calla",
      1,
      "callasteven@gmail.com",
      10
    );
    manager.getRole();
    manager.getName();

    teamMembers.push(manager);

    const engineer = new Engineer(
      "Besty",
      "Jones",
      1,
      "bjones@gmail.com",
      "bjones"
    );
    engineer.getRole();
    engineer.getName();

    teamMembers.push(engineer);

    const intern = new Intern(
      "Janice",
      "Grant",
      1,
      "jgrant@gmail.com",
      "Oxford"
    );
    intern.getRole();
    intern.getName();

    teamMembers.push(intern);

    expect(teamMembers).toEqual([
      {
        email: "callasteven@gmail.com",
        firstName: "Steve",
        fullName: "Steve Calla",
        id: 1,
        lastName: "Calla",
        officeNumber: 10,
        role: "Manager",
      },
      {
        email: "bjones@gmail.com",
        firstName: "Besty",
        fullName: "Besty Jones",
        id: 1,
        lastName: "Jones",
        gitHubUserName: "bjones",
        role: "Engineer",
      },
      {
        email: "jgrant@gmail.com",
        firstName: "Janice",
        fullName: "Janice Grant",
        id: 1,
        lastName: "Grant",
        internSchool: "Oxford",
        role: "Intern",
      },
    ]);
  });
});
