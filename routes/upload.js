/**
 * Created by s on 20.06.2015.
 */
var express = require('express');
var router = express.Router()
    , fs = require('fs')
    , exec = require('child_process').exec
    , util = require('util')
    , Files = {};

var app = require('../app');

var dirs = require('../config/config').directors;
console.log('dirs config:' + JSON.stringify(dirs));

router.get('/', function(req, res, next) {
    console.log("requesting upload page");
    res.render('upload', { title: 'Upload' });
});

module.exports = {
    getRouter: router,
    configSocket : function(server){
        configureUpload(server);
    }
};

function configureUpload(server) {
    console.log('configuring socket');
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        socket.on('Start', function (data) { //data contains the variables that we passed through in the html file
            console.log("starting socket");
            var Name = data['Name'];
            Files[Name] = {  //Create a new Entry in The Files Variable
                FileSize : data['Size'],
                Data	 : "",
                Downloaded : 0
            }
            var Place = 0;
            try{
                var Stat = fs.statSync(dirs.temp +  Name);
                if(Stat.isFile())
                {
                    Files[Name]['Downloaded'] = Stat.size;
                    Place = Stat.size / 524288;
                }
            }
            catch(er){} //It's a New File
            fs.open(dirs.temp + Name, 'a', 0755, function(err, fd){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
                    socket.emit('MoreData', { 'Place' : Place, Percent : 0 });
                }
            });
        });

        socket.on('Upload', function (data){
            var Name = data['Name'];
            Files[Name]['Downloaded'] += data['Data'].length;
            Files[Name]['Data'] += data['Data'];
            if(Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
            {
                fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
                    var inp = fs.createReadStream(dirs.temp + Name);
                    var out = fs.createWriteStream("Video/" + Name);
                    util.pump(inp, out, function(){
                        fs.unlink(dirs.temp + Name, function () { //This Deletes The Temporary File
                            exec("ffmpeg -i Video/" + Name  + " -ss 01:30 -r 1 -an -vframes 1 -f mjpeg Video/" + Name  + ".jpg", function(err){
                                socket.emit('Done', {'Image' : 'Video/' + Name + '.jpg'});
                            });
                        });
                    });
                });
            }
            else if(Files[Name]['Data'].length > 10485760){ //If the Data Buffer reaches 10MB
                fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
                    Files[Name]['Data'] = ""; //Reset The Buffer
                    var Place = Files[Name]['Downloaded'] / 524288;
                    var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
                    socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
                });
            }
            else
            {
                var Place = Files[Name]['Downloaded'] / 524288;
                var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
                socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
            }
        });
    });
}