var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');
var RestResult = require('./common/RestResult');
var session = require('express-session');

var config = require('./config/config');

var routes = require('./routes/index');
var users = require('./routes/users');
var order = require('./routes/order');
var business = require('./routes/business');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(session({
  secret: 'testApp', //为了安全性的考虑设置secret属性
  cookie: {maxAge: 60 * 1000 }, //设置过期时间
  resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
  saveUninitialized: false
}));

app.use(function(req, res, next) {

  res.error = function (errorCode, errorReason) {
    var restResult = new RestResult();
    restResult.code = errorCode;
    restResult.errorReason = errorReason;
    res.send(restResult);
  };


  res.success = function (returnValue) {
    var restResult = new RestResult();
    restResult.code = RestResult.NO_ERROR;
    restResult.returnValue = returnValue || {};
    res.send(restResult);
  };

  var err = new Error('Not Found');
  err.status = 404;
  //if (req.session.sign){
  //  next();
  //}else{
  //  res.redirect('/#/login');
  //}

  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/order', order);
app.use('/business', business);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
