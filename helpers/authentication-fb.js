/**
 * Created by SergeyPanasyuk on 5/21/2015.
 */
//https://github.com/jaredhanson/passport-facebook/tree/master/examples/login

var express = require('express')
    , passport = require('passport')
    , util = require('util')
    , FacebookStrategy = require('passport-facebook').Strategy
    , logger = require('morgan')
    , session = require('express-session')
    , bodyParser = require("body-parser")
    , cookieParser = require("cookie-parser")
    , methodOverride = require('method-override');

var users = require("../models/user");

var FACEBOOK_APP_ID = "995494053803420";
var FACEBOOK_APP_SECRET = "958b5801c0846f65b49db258217ef438";

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    users.findUserById(id, function (err, user) {
        done(err, user);
    });
});

// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "/login/facebook/callback",
        profileFields: ['id', 'displayName', 'photos']
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Facebook profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Facebook account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }
));
