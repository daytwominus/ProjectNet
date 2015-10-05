var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LibItemSchema   = new Schema({
    provider: String,
    id: String,//A unique identifier for the user, as generated by the service provider.
    name: String,
    previewUrl: String,
    description: String
});

var LibItem = mongoose.model('libitem', LibItemSchema);

var findLibItemsUniversal = function(params, callback){
    console.log("trying to find libItems: " + JSON.stringify(params));
    LibItem.collection.find(params).toArray(function(err, res){
        if(err) {
            console.log("error!");
            callback(err);
        }
        else {
            console.log("found libItems: " + JSON.stringify(res));
            console.log(callback);
            callback(null, res);
        }
    })
}

module.exports.findLibItemsUniversal = findLibItemsUniversal;