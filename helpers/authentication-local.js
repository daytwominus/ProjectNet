var flash = require('connect-flash')
    , express = require('express')
    , passport = require('passport')
    , util = require('util')
    , LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var users = require("../models/user");

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.
            users.findUserByLoginOrEmail(username, function(err, user) {
                console.log('user : ' + JSON.stringify(user));
                if (err) { return done(err); }
                if (!user) {
                    console.log('user ' + username + ' not found');
                    console.log('remembering user ' + username + ' as inactive');
                    //users.addUser({isActive:0, displayName : username}, null);

                    return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            })
        });
    }
));

module.exports = function (app){
    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }))
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function(req, res, next){
        if (req.isAuthenticated()) {
            console.log('isAuthenticated!', JSON.stringify(req.user));
            res.locals.user = req.user;
            res.locals.isLoggedIn = true;
            return next();
        }
        res.locals.isLoggedIn = false;
        return next();
        //res.redirect('/login');
    })
}
