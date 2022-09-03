const express = require('express');
const employees = express.Router();
const { db } = require('../db/database');

// route = /api/employees/

// GET Route for employees
employees.route('/')
  .get((req, res) =>
    db.query('SELECT * FROM employees', function (err, results) {
      res.send(results);
    })
  )
  .post((req, res) => {
    //post the input using an INSERT QUERY
    // console.log('1 =', req);
    // console.log('2 =', res.body);
    res.send('hello');
  })

  employees.get('/:manager', async (req, res) =>{
    let manager = req.params;
    console.log('2 = ', manager);

    let firstName = req.params.manager.split(' ')[0];
    let lastName = req.params.manager.split(' ')[1];

    let result = await db.awaitQuery(`SELECT * FROM employees WHERE first_name = "${firstName}" AND last_name = "${lastName}"`);

    console.log(result);
    // console.log('5 = ', result, result.length, result[0].id);

    // result.length !== 0 ? result = result[0].manager_id : result = 0;
    // res.json(result);

    result.length !== 0 ? result = result : result = 0;
    res.json(result);

    // res.json(result[0].manager_id);
  })



module.exports = employees;