const express = require('express');
const roles = express.Router();
const { getRoles, getRoleId, addRole, deleteRole } = require('../controller/roles');

// CURRENT ROUTE = /api/roles/

// ROUTES FOR ROLES
roles.route('/')
  .get( async (req, res) => {
    res.send(await getRoles());
  })
  .post((req, res) => {
    addRole(req.body.role, req.body.salary, req.body.department_id);
  })
  .delete((req, res) => {
    deleteRole(req.body.role);
  })

  roles.get('/:role', async (req, res) => {
    let result = await getRoleId(req.params.role);
    res.json(result);
  })

module.exports = roles;