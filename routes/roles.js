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
    // console.log('2 =', res.body);
    res.send('hello');
  })

  roles.get('/:role', (req, res) =>{
    let title = req.params;

    db.query(`SELECT id FROM roles WHERE title = "${title.role}"`, function (err, results) {
      if (err) { console.log(err) }

      console.log('2 = ', results, results.length, results[0].id)

      let id = results[0].id
      res.json(id);

      // console.log('3 =', results[0].id)
      // res.send(results[0].id)
    })
  })

module.exports = roles;