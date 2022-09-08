-- SOURCE ../../db/schema.sql;

DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;

USE employee_manager_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (name)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL,
  UNIQUE (title)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE SET NULL,
  UNIQUE (first_name, last_name)
);

SHOW DATABASES;
SHOW TABLES;
DESCRIBE departments;
DESCRIBE roles;
DESCRIBE employees;
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
