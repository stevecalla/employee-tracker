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

module.exports = departments;