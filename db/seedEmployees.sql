INSERT IGNORE INTO employees (first_name, last_name, full_name, role_id, manager_id)
VALUES  ("John", "One", "John One", 1, 2),
        ("Beth", "Two", "Beth Two", 2, 1),
        ("Rita", "Three", "Rita Three", 3, 1),
        ("Doreen", "Four", "Dorren Four", 4, 2),
        ("Zak", "Five", "Zak Five", 5, 1),
        ("Emily", "Six", "Emily Six", 6, 3),
        ("Megan", "Seven", "Megan Seven", 7, 9),
        ("Sue", "Eight", "Sue Eight", 8, 4),
        ("Molly", "Nine", "Molly Nine", 9, 4),
        ("Molly", "Nine", "Molly Nine", 9, 4),
        ("Molly", "Ten", "Molly Ten", 9, 4);qui

-- SHOW DATABASES;
-- SHOW TABLES;
DESCRIBE employees;
SELECT * FROM employees;

-- use employee_manager_db;
-- source ../../db/seedEmployees.sql;