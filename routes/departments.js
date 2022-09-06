const express = require('express');
const departments = express.Router();
const { getDepartments, getDepartmentId, getDeptBySalary, addDepartment, deleteDepartment } = require('../controller/departments.js');

// CURRENT ROUTE = /api/departments/

departments.route('/')
  .get( async (req, res) => {
    res.send(await getDepartments());
  })
  .post((req, res) => {
    addDepartment(req.body.name);
  })
  .delete((req, res) => {
    deleteDepartment(req.body.department);
  })

  departments.get('/viewdeptbysalary', async (req, res) => {
    res.send(await getDeptBySalary());
  });

  departments.get('/:department', async (req, res) =>{
    let result = await getDepartmentId(req.params.department);
    res.json(result);
  });

module.exports = departments;