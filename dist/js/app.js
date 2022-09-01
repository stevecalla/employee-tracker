const {
  getUserChoice,
  getDepartment,
  getRole,
  getEmployee,
  getUpdateEmployeeRole,
} = require("./runInquirer");

questionPrompts = async () => {
  // console.log(`\n\u001b[0;1mLET'S GET STARTED!!`);

  await getUserChoice()
    .then((choices) => choices.userSelection) //passes selection to next then statement
    .then((selection) => {
      console.log(selection);
      switch (selection) {
        case "View All Employees":
          //todo:get and render list of employees
          console.log("Get & Render a list of all employees!!");
          console.log("------------------------\n");
          questionPrompts();
          break;
        case "Add Employee":
          getInfo(getEmployee, "employee");
          break;
        case "Update Employee Role":
          getInfo(getUpdateEmployeeRole, "updateRole");
          break;
        case "View All Roles":
          //todo:get and render list of roles
          console.log("Get & Render a list of all roles!!");
          console.log("------------------------\n");
          questionPrompts();
          break;
        case "Add Role":
          getInfo(getRole, "role");
          break;
        case "View All Departments":
          //todo:get and render list of departments
          console.log("Get and Render a list of all departments!!");
          console.log("------------------------\n");
          questionPrompts();
          break;
        case "Add Department":
          getInfo(getDepartment, "department");
          break;
        default:
          console.log(selection)
          process.exit();
    }});
};

getInfo = async (askQuestions, type) => {
  await askQuestions()
    // .then((data) => console.log(data))
    .then((data) => console.log(`Added XYZ to the database\ncreate class; write ${type} info to database`, data))
    .then(() => questionPrompts())
};

console.log(`\u001b[0;36m
oooooooooooo                              oooo                                            
 888       8                               888                                            
 888          ooo   oo   oo    oo.ooooo.   888   .ooooo.  oooo    ooo   ooooo     ooooo  
 888oooo8     888P"Y88bP"Y88b   888   88b  888  d88   88b   88.  .8   d88   88b d88   88b 
 888          888   888   888   888   888  888  888   888    88..8    888ooo888 888ooo888 
 888       o  888   888   888   888   888  888  888   888     888     888    .o 888    .o 
o888ooooood8 o888o o888o o888o  888bod8P' o888o  Y8bod8P      .8       Y8bod8P   Y8bod8P 
                                888                        o   P                          
                               o888o                        Y8P                           
ooo        ooooo                                                               
 88.       .888                                                                
 888b     d 888   .oooo.    ooo. .oo.    .oooo.   .ooooo.    .ooooo.  oooo d8b 
 8 Y88. .P  888   P  )88b   888P"Y88b   P   88b  888   88b  d88   88b  888 8PP
 8   888    888   .oP"888   888   888   .oP"888  888   888  888ooo888  888     
 8    Y     888  d8(  888   888   888  d8(  888   88bod8P   888    .o  888     
o8o        o888o  Y888""8o o888o o888o  Y888""8o  8oooooo.   Y8bod8P  d888b    
                                                 d"     YD                     
                                                "Y88888P                     
`)



questionPrompts();

module.exports = {
  // questionPrompts,
};