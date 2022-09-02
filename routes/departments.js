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
);

module.exports = departments;