const express = require('express');
const employees = express.Router();
const { db } = require('../db/database');

// CURRENT ROUTE = /api/employees/

// ROUTE FOR EMPLOYEES
employees.route('/')
  .get((req, res) =>
    db.query(employeeTableSQL, function (err, results) {
      // db.query('SELECT * FROM employees', function (err, results) {
      res.send(results);
    })
  )
  .post((req, res) => {
    //post the input using an INSERT QUERY
    // console.log('1 =', req);
    // console.log('2 =', req.body);
    res.send('hello');

    db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${req.body.first_name}", "${req.body.last_name}", "${req.body.role_id}", "${req.body.manager_id}")`);
  })

  employees.get('/:manager', async (req, res) =>{
    let manager = req.params;
    // console.log('2 = ', manager);

    let firstName = req.params.manager.split(' ')[0];
    let lastName = req.params.manager.split(' ')[1];

    let result = await db.awaitQuery(`SELECT * FROM employees WHERE first_name = "${firstName}" AND last_name = "${lastName}"`);

    // console.log(result);
    // console.log('5 = ', result, result.length, result[0].id);

    // result.length !== 0 ? result = result[0].manager_id : result = 0;
    // res.json(result);

    result.length !== 0 ? result = result : result = 0;
    res.json(result);

    // res.json(result[0].manager_id);
  })

  const employeeTableSQL = `
    SELECT
      e.id AS EMPLOYEE_ID,
      e.first_name AS First_Name,
      e.last_name AS Last_Name,
      departments.name AS Department,
      roles.title AS Title,
      roles.salary AS Salary,
      CONCAT(m.first_name, ' ', m.last_name) AS Manager
    -- e.role_id AS e_role_id,
    -- e.manager_id as e_manager_id,
    -- m.id as m_id,
    -- m.first_name,
    -- m.last_name,
    -- m.role_id,
    -- m.manager_id,
    -- departments.id AS dept_id
    FROM employees AS e
    LEFT JOIN employees AS m
    ON e.manager_id = m.id
    INNER JOIN roles
    ON e.role_id = roles.id
    INNER JOIN departments
    ON roles.department_id = departments.id
  `;

module.exports = employees;