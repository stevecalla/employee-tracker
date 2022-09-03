const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const { db } = require('./db/database.js');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// app.use(express.static('public'));

// GET Route for homepage & 
// fallback route for when a user attempts to visit routes that don't exist
app.get('*', (req, res) =>
  res.send('No route found.')
  // res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
