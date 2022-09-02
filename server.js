const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'denverdenver',
    database: 'employee_manager_db'
  },
  console.log(`Connected to the books_db database.`)
);

// GET Route for employee data
app.get('/api/employees', (req, res) =>
  db.query('SELECT * FROM employees', function (err, results) {
    // console.log(results);
    res.send(results);
  })
);

// GET Route for deparment name
app.get('/api/departments', (req, res) =>
  db.query('SELECT * FROM departments', function (err, results) {
    res.send(results);
  })
);

// GET Route for employee roles/titles
app.get('/api/roles', (req, res) =>
  db.query('SELECT * FROM roles', function (err, results) {
    res.send(results);
  })
);

// GET Route for homepage & 
// fallback route for when a user attempts to visit routes that don't exist
app.get('*', (req, res) =>
  res.send('hello')
  // res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
