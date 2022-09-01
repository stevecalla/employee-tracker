INSERT INTO departments (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales"),
        ("Service");

-- SHOW DATABASES;
-- SHOW TABLES;
DESCRIBE departments;
SELECT * FROM departments;
SELECT 
  id,
  name
FROM departments
ORDER BY id;

-- use employee_manager_db;
-- source ../../db/seedDepartments.sql;