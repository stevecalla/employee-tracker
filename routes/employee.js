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
);

module.exports = employees;