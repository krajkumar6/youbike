var Auth = require('./auth.js');
var ubCust = require('../models/ubCust.js');

//var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');

//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//var FacebookStrategy = require('passport-facebook').Strategy;

module.exports= function(passport){
    
    /*passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        ubCust.findById(id,function(err,user){
            done(err, user);      
        })
      
    });*/
    
passport.use(new FacebookTokenStrategy({
        clientID: Auth.facebookAuth.clientID,
        clientSecret: Auth.facebookAuth.clientSecret
      }, function(accessToken, refreshToken, profile, done) {
       process.nextTick(function(){
            ubCust.findOne({'email' : profile.emails[0].value}, function(err, user) {
              if (err) 
                  return done(err);
              if(user)
              {
                if(user.google.id)
                {
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    user.facebook.fname = profile.name.givenName;
                    user.facebook.lname = profile.name.familyName;
                    user.fname = profile.name.givenName;
                    user.lname = profile.name.familyName;
                    user.email = profile.emails[0].value;
                    user.save(function(err){
                            if (err)
                                throw err;
                            return done(null,user);
                        });
                }
                else
                  return done(null,user);
              }
                else
                    {
                        var newUser = new ubCust;
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.fname = profile.name.givenName;
                        newUser.facebook.lname = profile.name.familyName;
                        newUser.fname = profile.name.givenName;
                        newUser.lname = profile.name.familyName;
                        newUser.email = profile.emails[0].value;
                        newUser.save(function(err){
                            if (err)
                                throw err;
                            return done(null,newUser);
                        });
                        console.log(profile);
                    }
                //done(null, profile, tokens);
                }); //findOne
                });//nextTick
      }
));
   
/*    passport.use(new GoogleStrategy ({
        clientID: Auth.googleAuth.clientID,
        clientSecret: Auth.googleAuth.clientSecret,
        callbackURL : Auth.googleAuth.callbackURL
      },
      function(token, refreshToken, profile, done) {
        // Create or update user, call done() when complete...
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
                        newUser.google.token = token;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value;
                        newUser.save(function(err){
                            if (err)
                                throw err;
                            return done(null,newUser);
                        });
                        console.log(profile);
                    }
                //done(null, profile, tokens);
                }); //findOne
                });//nextTick
        
      }
    ));*/
};

