var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Routing files
var routes = require('./routes/index');
var users = require('./routes/users');
var getAdvert = require('./routes/getAdvert');
var queryAdvertStat=require('./routes/queryAdvertStat');
var signWeb=require('./routes/signWeb');
var wzzSign=require('./routes/wzz/signup.js');
var wzzLogin=require('./routes/wzz/login.js');
var wzzRegister=require('./routes/wzz/register.js');
var wzzPersonInfo=require('./routes/wzz/personInfo.js');
var wzzQueryAllwzz=require('./routes/wzz/queryAllwzz.js');
var wzzQueryWzz=require('./routes/wzz/queryWzz.js');
var glyEditWzz=require('./routes/gly/editWzz.js');
var queryAdvertStat2 = require('./routes/advertStat/queryAdvertStat.js');
var addFlowStat = require('./routes/gly/addFlowStat');


var app = express();

//Global Values
var G_values = require('./DIY_Fun/Global_Value.js');
//Global Function
var G_ip = require('./DIY_Fun/G_Ip_Function');

//MySql Database
var pirateDB = require('./DIY_Fun/PirateDB');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/getAdvert',getAdvert);
app.use('/queryAdvertStat',queryAdvertStat);
app.use('/signWeb',signWeb);
app.use('/wzz/signup',wzzSign);
app.use('/wzz/login',wzzLogin);
app.use('/wzz/register',wzzRegister);
app.use('/wzz/personInfo',wzzPersonInfo);
app.use('/wzz/queryAllwzz',wzzQueryAllwzz);
app.use('/wzz/queryWzz',wzzQueryWzz);
app.use('/gly/editWzz',glyEditWzz);
app.use('/advertStat/queryAdvertStat',queryAdvertStat2);
app.use('/gly/addFlowStat',addFlowStat);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
