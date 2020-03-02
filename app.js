const express = require("express");
const app = express();
const server = require('http').createServer(app);

const dotenv = require('dotenv').config()
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const config = require('./oauth.js');
passport.use('facebook', new FacebookStrategy({
    clientID        : config.facebook.clientID,
    clientSecret    : config.facebook.clientSecret,
    callbackURL     : config.facebook.callbackURL,
    },

    function(access_token, refresh_token, profile, done) {
        process.nextTick(function() {
            return done(JSON.stringify(profile));
        });
    }
));

app.use('/', require('./router'));
app.listen(3030, () => {
    console.log(`Connecte toi sur http://localhost:3030`);
});