const { db } = require("../db/database");

const getDepartments = async () => {
  let result = await db.awaitQuery(deptTableSQL);
  return result;
};

const addDepartment = async (departmentName) => {
  db.query(
    `INSERT INTO departments(name) VALUES (?)`, [departmentName]
  );
};

const deleteDepartment = (department) => {
  db.query(`DELETE FROM departments WHERE name = ?`, [department]);
};

const getDepartmentId = async (department) => {
  let result = await db.awaitQuery(
    `SELECT id FROM departments WHERE name = ?`, [department]
  );
  result.length !== 0 ? (result = result[0].id) : (result = 0);
  return result;
};

const getDeptBySalary = async () => {
  let result = await db.awaitQuery(departmentBySalarySQL);
  return result;
};

const deptTableSQL = `
  SELECT
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

module.exports = {
  getDepartments,
  getDeptBySalary,
  getDepartmentId,
  addDepartment,
  deleteDepartment,
};
