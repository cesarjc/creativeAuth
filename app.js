'use strict';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressSession = require('express-session');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoStore = require('connect-mongo')({ session: expressSession });
const mongoose = require('mongoose');
const path = require('path');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myapp', { useMongoClient: true }).catch(console.error);
require('./models/usersModel.js');

const index = require('./routes/index');
const messages = require('./routes/messages');
const users = require('./routes/users');

const app = express();

app.use(expressSession({
  secret: 'SECRET',
  cookie: { maxAge: 2628000000 },
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/messages', messages);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = (req.app.get('env') === 'development') ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
