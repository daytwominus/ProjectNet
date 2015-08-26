/**
 * Manages uploading and streaming of video files.
 *
 * @module video
 */
'use strict';

var fs, uploadPath, supportedTypes;
var utils = require('../helpers/utils.js');
var videos = require("../models/video");

fs             = require('fs');
uploadPath     = __dirname + '/../videos';
supportedTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/avi',
];

module.exports = {
    list    : list,
    request : request,
    upload  : upload
};

_checkUploadDir();

function _checkUploadDir(cb) {
    cb = cb || function () {};

    fs.stat(uploadPath, function (err, stats) {
        if (
            (err && err.errno === 34)
        ) {
            // if there's no error, it means it's not a directory - remove it
            if (!err) {
                fs.unlinkSync(uploadPath);
            }

            // create directory
            fs.mkdir(uploadPath, cb);
            return;
        }

        cb();
    });
}

function list(stream, meta)  {
    _checkUploadDir(function () {
        //fs.readdir(uploadPath, function (err, files) {
        //
        //    stream.write({ files : files });
        //});

        videos.listVideos(null, function(err, data){
            //console.log('>>>' + JSON.stringify(data));
            var retFiles = [];
            data.forEach(function(file){
                retFiles.push(file['originalName']);
            });
            stream.write({ files : retFiles });
        });
    });
}

function request(client, meta) {
    var file = fs.createReadStream(uploadPath + '/' + meta.name);

    client.send(file);
}

function upload(stream, meta) {
    if (!~supportedTypes.indexOf(meta.type)) {
        stream.write({ err: 'Unsupported type: ' + meta.type });
        stream.end();
        return;
    }

    var re = /(?:\.([^.]+))?$/;

    var newName = utils.getUniqueNameForFile(meta.name) + '.' + re.exec(meta.name)[1];
    console.log('uploading file ' + meta.name + '; renaming to ' + newName);

    var file = fs.createWriteStream(uploadPath + '/' + newName);
    stream.pipe(file);

    stream.on('data', function (data) {
        stream.write({ rx : data.length / meta.size });
    });

    stream.on('end', function () {
        stream.write({ end: true });
    });

    videos.addVideo({
        'nameOnDisk' : newName,
        'originalName' : meta.name,
        'dateAdded' : new Date().getTime()});
}


