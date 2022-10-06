const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const console = require('console');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const countriesRouter = require('./routes/countries');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/countries', countriesRouter);

function errorHandler(err, req, res, next) {
  const data = {
    status: err.status || 500,
    message: err.message,
  };
  console.log(err);
  res.status(err.status || 500);
  res.json(data);
  next();
}

app.use(errorHandler);

module.exports = app;
