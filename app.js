var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbUtils = require('./modules/database/utils')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var debug = require('debug')('telebot-v3:app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.io = function(server) {
  var io = require('socket.io')(server);
  io.on('connection', function (socket) {
    //Ответ на сообщение
    socket.on('reply msg', args=>{
      debug(args.usr + ' | '+ args.text);
      global.bot.reply(args.usr, args.text);
      dbUtils.addMyMessage(args.text, args.usr)
    })
    //Изменение состояния "(Не)Оплачен"
    socket.on('change_pay', args=>{
      dbUtils.changePayd(args.num);
    });
    // Изменение метода ответа на сообщения (Ручной\Автомат)
    socket.on('change man', args=>{
      debug('Manual mode is: '+args.man);
      dbUtils.changeMan(args.id, args.man);
    });
  });
}

module.exports = app;
