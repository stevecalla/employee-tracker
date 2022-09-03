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
    // console.log('2 =', req.body.name);
    
    res.send('hello');

    db.query(`INSERT INTO departments(name) VALUES ("${req.body.name}")`);

  })

  departments.get('/:department', async (req, res) =>{
    let department = req.params;
    console.log(department);

    let result = await db.awaitQuery(`SELECT id FROM departments WHERE name = "${req.params.department}"`);
    // console.log('5 = ', result, result.length, result[0].id);

    console.log(result);

    result.length !== 0 ? result = result[0].id : result = 0;
    res.json(result);

    // res.json(result[0].id);
  })

module.exports = departments;