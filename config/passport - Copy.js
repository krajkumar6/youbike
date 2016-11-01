var Auth = require('./auth.js');
var ubCust = require('../models/ubCust.js');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//var FacebookStrategy = require('passport-facebook').Strategy;

module.exports= function(passport){
    
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
    
    passport.use(new FacebookStrategy({
        clientID : Auth.facebookAuth.clientID,
        clientSecret : Auth.facebookAuth.clientSecret,
        callbackURL : Auth.facebookAuth.callbackURL
        },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
           ubCust.findOne({'facebook.id' : profile.id}, function(err, user) {
          if (err) 
              return done(err);
          if(user)
              return done(null,user);
            else
                {
                    var newUser = new ubCust;
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = profile.accessToken;
                    newUser.facebook.name = profile.name.givenName+' '+profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.save(function(err){
                        if (err)
                            throw err;
                        return done(null,newUser);
                    });
                }
          done(null, user);
            }); 
        });
      }
    ));
    
    passport.use(new GoogleStrategy({
    clientID : Auth.googleAuth.clientID,
    clientSecret : Auth.googleAuth.clientSecret,
    callbackURL : Auth.googleAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
       ubCust.findOne({'google.id' : profile.id}, function(err, user) {
      if (err) 
          return done(err);
      if(user)
          return done(null,user);
        else
            {
                var newUser = new ubCust;
                newUser.google.id = profile.id;
                newUser.google.token = accessToken;
                newUser.google.name = profile.displayName;
                newUser.google.email = profile.emails[0].value;
                newUser.save(function(err){
                    if (err)
                        throw err;
                    return done(null,newUser);
                });
                //console.log(profile);
            }
      done(null, user);
        }); 
    });
    
    }
                                    
    ));
};

