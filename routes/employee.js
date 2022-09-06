const express = require('express');
const employees = express.Router();
const { db } = require('../db/database');
const { getEmployees, addEmployee, deleteEmployee, getEmployeeId, getEmployeesByDepartment, getEmployeesByManager, updateManager, updateRole } = require('../controller/employees');

// CURRENT ROUTE = /api/employees/

// ROUTE FOR EMPLOYEES
employees.route('/')
  .get( async (req, res) => {
    res.send(await getEmployees());
  })
  .post((req, res) => {
    addEmployee(req.body);
  })
  .delete((req, res) => {
    deleteEmployee(req.body);
  })

  employees.put('/update-role', (req, res) => {
    console.log('put =', req.body);
    res.send('hello put update role');

    updateRole(req.body);
  })

  employees.put('/update-manager', (req, res) => {
    console.log('put =', req.body);
    res.send('hello put update manager');

    updateManager(req.body);
  })

  employees.get('/viewbymanager', async (req, res) => {
    res.json(await getEmployeesByManager());
  });

  employees.get('/viewbydepartment', async (req, res) => { 
    res.json(await getEmployeesByDepartment());
  });

  employees.get('/:manager', async (req, res) => {
    let result = await getEmployeeId(req.params);
    res.json(result);
  })

  const employeeTableSQL = `
    SELECT
      e.id AS Employee_ID,
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
    ORDER BY e.id;
  `;

  const employeeByManagerSQL = `
    SELECT
      CONCAT(m.first_name, ' ', m.last_name) AS Manager,
      CONCAT(e.first_name, ' ', e.last_name) AS Employee
    FROM employees AS e
    LEFT JOIN employees AS m
    ON e.manager_id = m.id
    ORDER BY m.last_name, e.last_name;
  `;

  const employeeByDepartmentSQL = `
    SELECT
      d.name AS Department,
      CONCAT(e.first_name, ' ', e.last_name) AS Employee
    FROM employees AS e
    LEFT JOIN roles AS r
    ON e.role_id = r.id
    LEFT JOIN departments AS d
    ON r.department_id = d.id
    ORDER BY department, e.last_name;
  `;

module.exports = employees;