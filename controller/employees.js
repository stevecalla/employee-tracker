const { db } = require('../db/database');

const getEmployees = async () => {
  let result = await db.awaitQuery(employeeTableSQL);
  return result;
}

const addEmployee = async (req) => {
  db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${req.first_name}", "${req.last_name}", "${req.role_id}", "${req.manager_id}")`);
}

const updateManager = async (req) => {
  console.log('aakaa = ', req, req.employee)

  let first_name = req.employee.split(' ')[0];
  let last_name = req.employee.split(' ')[1];

  db.query(`UPDATE employees SET manager_id = ${req.manager_id} WHERE first_name = "${first_name}" and last_name = "${last_name}"`);
}

const updateRole = async (req) => {
  db.query(`UPDATE employees SET role_id = ${req.role_id} WHERE id = ${req.id}`);
}

const deleteEmployee = (req) => {
  let first_name = req.employee.split(' ')[0];
  let last_name = req.employee.split(' ')[1];

  db.query(`DELETE FROM employees WHERE first_name = "${first_name}" and last_name = "${last_name}"`);
}

const getEmployeeId = async (req) => {
  let first_name = req.manager.split(' ')[0];
  let last_name = req.manager.split(' ')[1];

  let result = await db.awaitQuery(`SELECT * FROM employees WHERE first_name = "${first_name}" AND last_name = "${last_name}"`);

  result.length !== 0 ? result = result : result = 0;
  return result;
}

const getEmployeesByManager = async () => {
  let result = await db.awaitQuery(employeeByManagerSQL);
  return result;
}

const getEmployeesByDepartment = async () => {
  let result = await db.awaitQuery(employeeByDepartmentSQL);
  return result;
}

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

module.exports = {
  getEmployees,
  addEmployee,
  deleteEmployee,
  getEmployeeId,
  getEmployeesByManager,
  getEmployeesByDepartment,
  updateManager,
  updateRole,
}