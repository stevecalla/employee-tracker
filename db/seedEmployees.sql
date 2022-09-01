INSERT INTO employees (first_name, last_name, role_id)
VALUES  ("John", "One", 1),
        ("Beth", "Two", 2),
        ("Rita", "Three", 3),
        ("Doreen", "Four", 4),
        ("Zak", "Five", 5),
        ("Emily", "Six", 6),
        ("Megan", "Seven", 7),
        ("Sue", "Eight", 8),
        ("Molly", "Nine", 9),
        ("Molly", "Ten", 9);

UPDATE employees SET manager_id = 2 WHERE id = 1;
UPDATE employees SET manager_id = 3 WHERE id = 2;
UPDATE employees SET manager_id = 9 WHERE id = 3;
UPDATE employees SET manager_id = 5 WHERE id = 4;
UPDATE employees SET manager_id = 4 WHERE id = 5;
UPDATE employees SET manager_id = 1 WHERE id = 6;
UPDATE employees SET manager_id = 8 WHERE id = 7;
UPDATE employees SET manager_id = 2 WHERE id = 8;
UPDATE employees SET manager_id = 6 WHERE id = 9;
UPDATE employees SET manager_id = 1 WHERE id = 10;

-- SHOW DATABASES;
-- SHOW TABLES;
DESCRIBE employees;
SELECT * FROM employees;
SELECT 
  id,
  CONCAT(first_name, " ", last_name) AS full_name  
FROM employees
ORDER BY id;

-- use employee_manager_db;
-- source ../../db/seedEmployees.sql;