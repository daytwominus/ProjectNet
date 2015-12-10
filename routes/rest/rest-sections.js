var sections = require("../../models/section");

module.exports = function(router) {
    router.get('/sections', function (req, res, next) {
        var params = req.query;
        console.log('getting sections ', params);
        sections.getSections(params, function(err, data){
            console.log("requesting sections. params: ", params);
            if (err)
                res.send(err);
            else {
                res.json(data);
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