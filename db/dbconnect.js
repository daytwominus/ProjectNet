

var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost:27017';
console.log('connecting on ' + connectionString)
mongoose.connect(connectionString);