const express = require('express');
const departments = express.Router();
const { getDepartments, getDepartmentId, getDeptBySalary, addDepartment, deleteDepartment } = require('../controller/departments.js');

// CURRENT ROUTE = /api/departments/

departments.route('/')
  .get( async (req, res) => {
    // console.log(await getDepartments());
    res.send(await getDepartments());
  })
  .post((req, res) => {
    // console.log('1 =', req);
    // console.log('2 =', req.body.name);

    addDepartment(req.body.name);
  })
  .delete((req, res) => {
    // console.log('1 delete dept =', req);
    // console.log('2 delete dept =', req.body, req.body.department);

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