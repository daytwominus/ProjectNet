var mongoose     = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var VideoSchema   = new Schema({
    userId : ObjectId,
    isActive: Number,
    nameOnDisk : String,
    originalName : String,
    dateAdded : Number
});

var Video = mongoose.model('Video', VideoSchema);

module.exports = {
    addVideo: function(params, done){
        console.log("creating video:" + JSON.stringify(params));
        var video = new Video();
        for (var key in params) {
            video[key] = params[key];
        }

        video.save(function (err) {
            if (err)
                console.log('error saving video');
            console.log("video saved: " + JSON.stringify(video));
        });
    },
    listVideos : function(params, done) {
        console.log('listing videos');
        mongoose.model('Video').find({}, function(err, data){
            done(err, data);
        });
    }
}
