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

module.exports = employees;