/**
 * Created by s on 19.05.2015.
 */
module.exports = function(app) {
    app.get('/users/:name', function(req, res){
        res.render('users/profile', {title: 'User profile'});
    });
};