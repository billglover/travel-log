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

const app = express();

passport.use(
  new BearerStrategy(async (token, done) => {
    const user = await tokensModels.get_user_by_token(token);
    if (user === undefined) {
      //console.log('invalid id', user);
      const err = new Error('Inavlid token');
      err.status = 401;
      return done(err);
    }
    //console.log('valid id', user);
    return done(null, token, { scope: 'all', user_id: user.user_id });
  }),
);

app.set('view engine', 'ejs');
app.use(logger('dev', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const apiPrefix = '/api';
app.use(`${apiPrefix}/`, indexRouter);
app.use(`${apiPrefix}/users`, usersRouter);
app.use(`${apiPrefix}/countries`, countriesRouter);
app.use(`${apiPrefix}/visits`, visitsRouter);
app.use(`${apiPrefix}/tokens`, tokensRouter);

const countriesModel = require('./models/countries');
const usersModel = require('./models/users');
const visitsModel = require('./models/visits');
app.get('/new-visits', async (req, res) => {
  //console.log(req.query.access_token);
  const allCountries = await countriesModel.get_all();
  const countryNames = allCountries.map((country) => country.name);
  const user = await usersModel.get_by_token(req.query.access_token);
  const visits = await visitsModel.get_by_user_id(user.id);
  console.log(req.query.visit_id);
  console.log(visits);
  res.render('new-visits', {
    token: req.query.access_token,
    userId: user.id,
    name: user.name,
    countries: visits,
    // countryIds: visits.map((visit) => visit.id),
    allCountries: countryNames, // this is for autocomplete feature
  });
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
