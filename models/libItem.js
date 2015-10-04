var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LibItemSchema   = new Schema({
    provider: String,
    id: String,//A unique identifier for the user, as generated by the service provider.
    name: String
});

var LibItem = mongoose.model('LibItem', LibItemSchema);