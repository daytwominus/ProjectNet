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
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
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
            console.log("facebook account log in: " +  JSON.stringify(profile));

            users.findUserByIdAndActive(profile["id"], function(err, user){
                if (err) { return done(err); }
                if(!user) {
                    users.findUserById(profile["id"], function (err, user) {
                        if(user == null){
                            console.log("user hasn't been found. Adding as Inactive to remember");
                            profile["isActive"] = 0;
                            users.addUser(profile, null);
                        }
                        done(null, null);
                    });
                }
                else {
                    return done(null, profile);
                }
            });
        });
    }
));
