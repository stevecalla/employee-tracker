const express = require('express');
const roles = express.Router();
const { db } = require('../db/database');

// route = /api/roles/

// GET Route for roles
roles.route('/')
  .get((req, res) =>
    db.query('SELECT * FROM roles', function (err, results) {
      res.send(results);
    })
  )
  .post((req, res) => {
    //post the input using an INSERT QUERY
    // console.log('1 =', req);
    console.log('2 =', res.body);
    res.send('hello');

    db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${req.body.role}", "${req.body.salary}", "${req.body.department_id}")`);

  })

  roles.get('/:role', async (req, res) =>{
    let title = req.params;

    let result = await db.awaitQuery(`SELECT id FROM roles WHERE title = "${title.role}"`);
    console.log('5 = ', result, result.length);

    result.length !== 0 ? result = result[0].id : result = 0;
    res.json(result);

    // res.json(result[0].id);
  })

module.exports = roles;