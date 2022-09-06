const { db } = require('../db/database');

const getRoles = async () => {
  let result = await db.awaitQuery(roleTableSQL);
  return result;
}

const getRoleId = async (title) => {
  let result = await db.awaitQuery(`SELECT id FROM roles WHERE title = "${title}"`);
  result.length !== 0 ? result = result[0].id : result = 0;
  return result;
}

const addRole = async (req) => {
  db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${req.role}", "${req.salary}", "${req.department_id}")`);
}

const deleteRole = (role) => {
  db.query(`DELETE FROM roles WHERE title = "${role}"`);
}

const roleTableSQL = `
  SELECT
    roles.id AS Role_ID,
    roles.title AS Title,
    departments.name AS Department,
    roles.salary AS Salary
  FROM roles
  INNER JOIN departments
  ON roles.department_id = departments.id
  ORDER BY roles.id;
`;

module.exports = {
  getRoles,
  getRoleId,
  addRole,
  deleteRole
}