var sections = require("../../models/section");
var posts = require("../../models/post");
var helpers = require("../../helpers/utils");

module.exports = function(router) {
    router.get('/sections', function (req, res, next) {

        var params = req.query;
        console.log('getting sections ', params, 'category=', req.query.category);
        sections.getSections(params, function(err, sections){
            console.log('sections: ', JSON.stringify(sections));
            var counter = 0;
            var ret = [];
            if (err)
                res.send(err);
            else {
                    helpers.asyncLoop(sections.length, function(loop){
                        var i = loop.iteration();
                        var s = sections[i];
                        //console.log('>>>>', s.category !== req.query.category);
                        //if(s.category !== req.query.category){
                        //    loop.next();
                        //    return;
                        //}

                        posts.findPostsWithSection(s["_id"], function(err, data){
                            s = s.toObject({ getters: true, virtuals: false });
                            s['posts'] = data;
                            ret.push(s);
                            loop.next();
                        });
                    },
                    function(){
                        //console.log("!!!!!!!>>", ret);
                        res.json(ret);
                    });
            }
        });
    });

    router.post('/sections', function(req, res, next) {
        console.log("submitting section " + JSON.stringify(req.body));
        var s = req.body;

        sections.saveSection(s, function(err, data){
            if(err){
                res.sendStatus(err);
                return;
            }
            res.sendStatus(200);
        });
    });

    router.delete('/sections/:id', function(req, res, next) {
        console.log("deleting section by id" + JSON.stringify(req.params['id']));

        sections.deleteSection({"_id":req.params['id']}, function(err, data){
            console.log('deleted: ');
            res.sendStatus(200);
        });
    });
}