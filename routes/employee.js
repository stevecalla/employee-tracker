const express = require('express');
const employees = express.Router();
const { getEmployees, addEmployee, deleteEmployee, getEmployeeId, getEmployeesByDepartment, getEmployeesByManager, updateManager, updateRole } = require('../controller/employees');

// CURRENT ROUTE = /api/employees/

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
    console.log('update role route = ', req.body)
    updateRole(req.body);
    res.end();
  })

  employees.put('/update-manager', (req, res) => {
    updateManager(req.body);
    res.end();
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

module.exports = employees;