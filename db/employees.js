// const { db } = require('./database');
// // const mysql = require(`mysql-await`);

// // getAllEmployees = async () => {
// //   await db.query('SELECT * FROM employees', function (err, results) {
// //     console.log(results);
// //     // res.send(results);
// //     return(results);
// //   })
// // }

// async function getAllEmployees()  {
//   // const test = await db.query('SELECT * FROM employees', function (_err, results) {
//     // console.log(results);
//   //   // res.send(results);
//   //   return(results);
//   // })

//   const results = await db.awaitQuery('SELECT * FROM employees');
//   // console.log(results)
//   return results;
// }

// module.exports = {
//   getAllEmployees
// }