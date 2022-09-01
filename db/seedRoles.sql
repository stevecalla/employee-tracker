INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", "10000", 4),
        ("Sales Person", "10000", 4),
        ("Lead Engineer", "10000", 2),
        ("Software Engineer", "10000", 2),
        ("Account Manager", "10000", 1),
        ("Accountant", "10000", 1),
        ("Legal Team Lead", "10000", 3),
        ("Lawyer", "10000", 3),
        ("Customer Service Rep", "10000", 5);

-- SHOW DATABASES;
-- SHOW TABLES;
DESCRIBE roles;
SELECT * FROM roles;

-- use employee_manager_db;
-- source ../../db/seedRoles.sql;