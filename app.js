var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();

require('./helpers/logging')(app);
require('./models/db');
require('./helpers/authentication-local')(app);
require('./helpers/authentication-fb');
require('./helpers/translations')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;

var routesArray = [
  {key:'/', value:'./routes/index'},
  {key:'/index', value:'./routes/index'},
  {key:'/login', value:'./routes/login'},
  {key:'/users', value:'./routes/users'},
  {key:'/posts', value:'./routes/posts'},
  {key:'/multimedia', value:'./routes/multimedia'},
  {key:'/students', value:'./routes/students'},
  {key:'/home', value:'./routes/home'},
  {key:'/cpanel', value:'./routes/cpanel'},
  {key:'/profile', value:'./routes/profile'},
  {key:'/rest', value:'./routes/rest'},
  {key:'/library', value:'./routes/library'},
  {key:'/glossary', value:'./routes/glossary'},
  {key:'/courses', value:'./routes/courses'},
  {key:'/users', value:'./routes/users'},
  {key:'/signup', value:'./routes/signup'},
  {key:'/sections', value:'./routes/sections'},
  {key:'/search', value:'./routes/search'},
];


var doOnce = function(url, f){
  for(var i =0; i < routesArray.length; ++i){
    if( url == '/' ||
        routesArray[i].key != '/' &&
        routesArray[i].key != '/rest' &&
        stringStartsWith(url, routesArray[i].key)){
      f();
      return true;
    }
  }
  return false;
}

// SECTIONS RETREIVING
var sections = require("./models/section");
var users = require("./models/user");
function stringStartsWith (string, prefix) {
  return string.slice(0, prefix.length) == prefix;
}

var getSectionsForCategory = function(sections, cat){
  var ret = [];
  for(var i = 0; i < sections.length; ++i){
    console.log(cat, sections[i].name);
    if(sections[i].category && sections[i].category.toLowerCase() === cat.toLowerCase())
      ret.push(sections[i]);
  }
  return ret;
}

//var uploadcarekey = process.env.UPLOADCARE_PUBLIC_KEY;
//console.log('UPLOADCARE_PUBLIC_KEY: ', uploadcarekey);

app.use(function (req, res, next) {
  var url = req.url.toLowerCase();
  if(!doOnce(url, function(){
        sections.getSections({}, function(err, sections){
          app.locals.sectionsLibrary = getSectionsForCategory(sections, 'library');
          app.locals.sectionsCourse = getSectionsForCategory(sections, 'course');
          app.locals.sectionsGlossary = getSectionsForCategory(sections, 'glossary');
          //app.locals.uploadcarekey = uploadcarekey;

          users.findUsersUniversal({}, function(err, u){
              app.locals.allUsers = u;
              next();
            });
        });
      })){
    next();
  }
});

////////////////////////

var posts = require("./models/post");
app.use(function (req, res, next) {
  var url = req.url.toLowerCase();
  if(!doOnce(url, function(){
        posts.findPostsUniversal({showInImportant:true}, function(err, p){
          //for(var i = 0; i < p.length; ++i){
          //  //p[i]['data'] = '';
          //}
          app.locals.importantPosts = p;
          next();
        });
      })){
    next();
  }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/ckeditor')));
app.use(passport.initialize());


// routing:
for(var i =0; i < routesArray.length; ++i){
  app.use(routesArray[i].key, require(routesArray[i].value));
}

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
