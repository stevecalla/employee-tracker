const express = require('express');
const roles = express.Router();
const { db } = require('../db/database');

// CURRENT ROUTE = /api/roles/

// ROUTES FOR ROLES
roles.route('/')
  .get((req, res) =>
    db.query(roleTableSQL, function (err, results) {
    // db.query('SELECT * FROM roles', function (err, results) {
      res.send(results);
    })
  )
  .post((req, res) => {
    //post the input using an INSERT QUERY
    // console.log('1 =', req);
    // console.log('2 =', req.body);
    res.send('hello');

    db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${req.body.role}", "${req.body.salary}", "${req.body.department_id}")`);
  })
  .delete((req, res) => {
    //post the input using an INSERT QUERY
    console.log('1 delete role =', req);
    console.log('2 delete role =', req.body, req.body.title);
    res.send('hello');

    db.query(`DELETE FROM roles WHERE title = "${req.body.title}"`);
  })

  roles.get('/:role', async (req, res) =>{
    let title = req.params;

    let result = await db.awaitQuery(`SELECT id FROM roles WHERE title = "${title.role}"`);
    // console.log('5 = ', result, result.length);

    result.length !== 0 ? result = result[0].id : result = 0;
    res.json(result);

    // res.json(result[0].id);
  })

  const roleTableSQL = `
    SELECT
    -- *,
      roles.id AS Role_ID,
      roles.title AS Title,
      departments.name AS Department,
      roles.salary AS Salary
    FROM roles
    INNER JOIN departments
    ON roles.department_id = departments.id
    ORDER BY roles.id;
  `;

module.exports = roles;