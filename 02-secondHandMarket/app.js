var createError = require('http-errors');
var express = require('express');
var logger = require('./utils/logger');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var articlesRouter = require('./routes/articles');

var app = express();


app.use(logger);
app.use(express.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);
app.use('/articles',articlesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send('ERROR ' + err.message);
});

module.exports = app;
