const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const bearer = require('passport-http-bearer');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const countriesRouter = require('./routes/countries');
const visitsRouter = require('./routes/visits');
const tokensRouter = require('./routes/tokens');

const app = express();

function verifyToken(token, done) {
  return done(null, {});
}
passport.use(new bearer.Strategy(verifyToken));

app.use(logger('dev', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/countries', countriesRouter);
app.use('/visits', visitsRouter);
app.use('/tokens', tokensRouter);

function errorHandler(err, req, res, next) {
  const data = {
    status: err.status || 500,
    message: err.message,
  };
  res.status(err.status || 500);
  res.json(data);
  next();
}

app.use(errorHandler);

module.exports = app;
