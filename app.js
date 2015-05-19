var express = require('express'),
    routes = require('./routes'),
    fs = require('fs');

var app = express.createServer();

var logFile = fs.createWriteStream('./myLogFile.log', {flags: 'a'});

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger({stream: logFile}));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
require('./routes/index')(app);
require('./routes/users')(app);
require('./models/db');

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
