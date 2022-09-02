//CONNECT TO DATABASE
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'denverdenver',
    database: 'employee_manager_db'
  },
  console.log(`Connected to the classlist_db database.`)
);

module.exports = {
  db
}