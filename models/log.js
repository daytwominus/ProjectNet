var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LogSchema   = new Schema({
    time: Date,
    line: String
});

module.exports = mongoose.model('Log', LogSchema);

var Log = mongoose.model('Log', LogSchema);
module.exports = {
    log: function(msg){
        console.log("logging message " + msg);


        var log = new Log();
        log.line = msg;
        log.save(function(err) {
            if (err)
                console.log('error logging');
            console.log("logged!");
        });
    },

    getLogs: function(){
        Log.find(function(err, logs) {
            if (err)
                res.send(err);
            console.log(logs);
        });
    }
}
