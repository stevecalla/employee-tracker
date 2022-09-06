const express = require('express');
const departments = express.Router();
const { db } = require('../db/database');

// CURRENT ROUTE = /api/departments/

// ROUTES FOR DEPARTMENTS
departments.route('/')
  .get((req, res) =>
    db.query(deptTableSQL, function (err, results) {
    // db.query('SELECT * FROM departments', function (err, results) {
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
  .delete((req, res) => {
    //post the input using an INSERT QUERY
    console.log('1 delete dept =', req);
    console.log('2 delete dept =', req.body, req.body.department);
    res.send('hello');

    // db.query(`DELETE FROM departments WHERE name = "${req.body.name}"`);
    db.query(`DELETE FROM departments WHERE name = "${req.body.department}"`);
  })

  departments.get('/viewdeptbysalary', async (req, res) => {
    console.log('req.params 25 = ', req.params);
    
    let result = await db.awaitQuery(departmentBySalarySQL);
    
    res.json(result);
  });

  departments.get('/:department', async (req, res) =>{
    let department = req.params;
    // console.log(department);

    let result = await db.awaitQuery(`SELECT id FROM departments WHERE name = "${req.params.department}"`);
    // console.log('5 = ', result, result.length, result[0].id);

    console.log(result);

    result.length !== 0 ? result = result[0].id : result = 0;
    res.json(result);

    // res.json(result[0].id);
  });

  const deptTableSQL = `
    SELECT
    -- *,
      id AS Dept_ID,
      name AS Department
    FROM departments
    ORDER BY id;
  `;

  const departmentBySalarySQL = `
    SELECT
      departments.id AS Department_ID,
      departments.name as Department,
      sum(r.salary) AS Salary_Total,
      count(e.id) AS Employee_Count
    FROM employees AS e
    LEFT JOIN employees AS m
    ON e.manager_id = m.id
    INNER JOIN roles AS r
    ON e.role_id = r.id
    INNER JOIN departments
    ON r.department_id = departments.id
    GROUP BY departments.id
    ORDER BY departments.id
  `;

module.exports = departments;