const express = require('express');

const departmentsRouter = require('./departments');
const rolesRouter = require('./roles');
const employeesRouter = require('./employee');

const app = express();

app.use('/departments', departmentsRouter);
app.use('/roles', rolesRouter);
app.use('/employees', employeesRouter);

module.exports = app;