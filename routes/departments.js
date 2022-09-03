const express = require('express');
const departments = express.Router();
const { db } = require('../db/database');

// route = /api/departments/

// GET Route for departments
departments.route('/')
  .get((req, res) =>
    db.query('SELECT * FROM departments', function (err, results) {
      res.send(results);
    })
  )
  .post((req, res) => {
    //post the input using an INSERT QUERY
    // console.log('1 =', req);
    // console.log('2 =', res.body);
    res.send('hello');
  })

  departments.get('/:department', async (req, res) =>{
    let department = req.params;
    console.log(department);

    let result = await db.awaitQuery(`SELECT id FROM departments WHERE name = "${req.params.department}"`);
    // console.log('5 = ', result, result.length, result[0].id);

    console.log(result);
    res.json(result[0].id);
  })

module.exports = departments;