const express = require("express");
const roles = express.Router();
const {
  getRoles,
  getRoleId,
  addRole,
  deleteRole,
} = require("../controller/roles");

// CURRENT ROUTE = /api/roles/

roles
  .route("/")
  .get(async (req, res) => {
    res.send(await getRoles());
  })
  .post((req, res) => {
    addRole(req.body);
  })
  .delete((req, res) => {
    deleteRole(req.body.role);
  });

roles.get("/:role", async (req, res) => {
  let result = await getRoleId(req.params.role);
  res.json(result);
});

module.exports = roles;
