var libItems = require("../../models/libItem");

module.exports = function(router){
    router.get('/items', function(req, res, next) {
        libItems.findLibItemsUniversal({}, function(err, data){
            if (err)
                res.send(err);
            else {
                for (var i = 0; i < data.length; i++) {
                    //if(data.previewUrl)
                    //    data.previewUrl = "/public/images/defaultLibItem"
                }
                res.json(data);
            }
        });
    });

    router.post('/libItems', function(req, res, next) {
        console.log("posting new lib item: "  + JSON.stringify(req.body));
        libItems.addNewLibItem(req.body, function(err, data){
            if(err)
                res = "error "+ err;
            else
                res.send();
        });
        res.send("OK");
    });
    router.delete('/libItems/:id', function(req, res, next) {
        console.log("deleting libitem by id" + JSON.stringify(req.params['id']));

        libItems.deleteLibItem({"_id":req.params['id']}, function(err, data){
            res.sendStatus(200);
        });
    });
};