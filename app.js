var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
//var ckStaticsPath = require('node-ckeditor');
var app = express();

require('./helpers/logging')(app);
require('./models/db');
require('./helpers/authentication-local')(app);
require('./helpers/authentication-fb');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;

var sections = require("./models/section");
var posts = require("./models/post");
app.use(function (req, res, next) {
  sections.getSections({}, function(err, sections){
    app.locals.sections = sections;
  });

  var url = req.url.toLowerCase();
  //console.log('url=', url);
  var prefix = '/users/';
  if(url.substring(0, prefix.length) === prefix && url != prefix){
    var u = url.substring(prefix.length);
    console.log('getting user posts for ', u);
    posts.findPostsForUserName(u, function(err, data){
      console.log('posts for ' + url + 'received');
      app.locals.posts = data;
      app.locals.username = u;
    });
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/ckeditor')));
app.use(passport.initialize());


// routing:
var routes = require('./routes/index');
app.use('/', routes);
app.use('/index', routes);
app.use('/login', require('./routes/login'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/home', require('./routes/home'));
app.use('/cpanel', require('./routes/cpanel'));
app.use('/profile', require('./routes/profile'));
app.use('/rest', require('./routes/rest'));
app.use('/library', require('./routes/library'));
app.use('/glossary', require('./routes/glossary'));
app.use('/media', require('./routes/media'));
app.use('/courses', require('./routes/courses'));
app.use('/users', require('./routes/users'));
app.use('/signup', require('./routes/signup'));
app.use('/sections', require('./routes/sections'));
app.use('/search', require('./routes/search'));
//app.use('/public', require('./routes/public'));

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
