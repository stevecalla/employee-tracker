const mysql = require('mysql2');
const Department = require('./lib/Department');

// Connect to database
// const connectDb = mysql.createConnection(
//   {
//     host: 'localhost',
//     user: 'root',
//     password: 'denverdenver',
//     database: 'employee_manager_db'
//   },
//   console.log(`Connected to the classlist_db database.`)
// );

// getDepartments = () => {
//   // let data = [];
//   connectDb.promise().query("SELECT id, name FROM departments ORDER BY id;")
//     // .then((data) => console.log(data))
//     .then( ([rows, fields]) => {
//       // console.log(rows);
//       // data = rows;
//       // let departments = rows.map(element => new Department(element.id, element.name))
//       // console.log(departments);
//       // departments.getList();
//       // testData(rows);
//       // console.log(rows)
//       // return rows;
//     })
//     .catch(console.log)
//     .then( () => connectDb.end());
// };

// getDepartments();
// testData = (data) => {
//   console.log(data)
// }


module.exports = {
  connectDb,
  getDepartments
}