const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const countriesRouter = require('./routes/countries');
const visitsRouter = require('./routes/visits');
const tokensRouter = require('./routes/tokens');
const tokensModels = require('./models/tokens');
const newVisitsRouter = require('./routes/visits');
const aboutRouter = require('./routes/about');

const app = express();

passport.use(new BearerStrategy(async (token, done) => {
  const user = await tokensModels.get_user_by_token(token);
  if (user === undefined) {
    console.log('invalid id', user);
    const err = new Error('Inavlid token');
    err.status = 401;
    return done(err);
  }
  console.log('valid id', user);
  return done(null, token, { scope: 'all', user_id: user.user_id });
}));

app.set('view engine', 'ejs');
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
app.use('/new-visits', newVisitsRouter);
app.use('/about', aboutRouter);

const countriesModel = require('./models/countries');
app.get('/about', async (req, res) => {
  const allCountries = await countriesModel.get_all();
  const countryNames = allCountries.map((country) => country.name);
  res.render('about', { name: 'Bill', countries: ['Croatia', 'Spain', 'Italy'], allCountries: countryNames });
});

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
