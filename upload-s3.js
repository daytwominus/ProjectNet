var Upload = require('s3-uploader');

var client = new Upload('my_s3_bucket', {
    aws: {
        path: 'images/',
        region: 'us-east-1',
        acl: 'public-read'
    },

    cleanup: {
        versions: true,
        original: false
    },

    original: {
        awsImageAcl: 'private'
    },

    versions: [{
        maxHeight: 1040,
        maxWidth: 1040,
        format: 'jpg',
        suffix: '-large',
        quality: 80,
        awsImageExpires: 31536000,
        awsImageMaxAge: 31536000
    },{
        maxWidth: 780,
        aspect: '3:2!h',
        suffix: '-medium'
    },{
        maxWidth: 320,
        aspect: '16:9!h',
        suffix: '-small'
    },{
        maxHeight: 100,
        aspect: '1:1',
        format: 'png',
        suffix: '-thumb1'
    },{
        maxHeight: 250,
        maxWidth: 250,
        aspect: '1:1',
        suffix: '-thumb2'
    }]
});

//client.upload('/some/image.jpg', {}, function(err, versions, meta) {
//    if (err) { throw err; }
//
//    versions.forEach(function(image) {
//        console.log(image.width, image.height, image.url);
//        // 1234 4567 https://my-bucket.s3.amazonaws.com/path/ab/cd/ef.jpg
//    });
//});