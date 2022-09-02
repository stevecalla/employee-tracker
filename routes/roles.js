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
);

module.exports = roles;