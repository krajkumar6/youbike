var ubCust = require('../models/ubCust.js');
var bodyParser = require('body-parser');

var google=require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;
var oauth2client = new OAuth2('1094664898379-8u0muh9eme8nnvp95dafuc3rvigu4j9u.apps.googleusercontent.com','KQ_vNDaZzTvXDdsfgp5jqeZW','http://localhost:3000/auth/google/callback');


module.exports = function(req,res,next){
    
        console.log('Im in the google auth middleware');
        //console.log(acc_token);
         oauth2client.setCredentials({
            access_token : req.token
        //refresh_token: token.refresh_token
        });
    
        plus.people.get({
            userId:'me',
            auth:oauth2client
        },function(err,response){
            if (err) {
                throw err;
                res.sendStatus(401);
            }else{
                req.guser=response;
                
                ubCust.findOne({'email' : req.guser.emails[0].value}, 
                               function(err, user) {
                  if (err) 
                      return handleError(err);
                  if(user)
                      {
                        if(user.facebook.id && !user.google.id)
                        {
                            user.google.id = req.guser.id;
                            //user.google.token = accessToken;
                            user.google.fname = req.guser.displayName;
                            user.google.lname = req.guser.name.familyName;
                            user.save(function(err){
                                    if (err)
                                        throw err;
                                    req.user=user;
                                    next();
                                });
                        }
                          else{
                              req.user=user;
                              //console.log('req.user',req.user);
                              next();
                          }
                      }

                    else
                        {
                            var newUser = new ubCust;
                            newUser.google.id = req.guser.id;
                            //newUser.google.token = accessToken;
                            newUser.google.fname = req.guser.displayName;
                            newUser.google.lname = req.guser.name.familyName;
                            newUser.fname = req.guser.displayName;
                            newUser.lname = req.guser.name.familyName;
                            newUser.email = req.guser.emails[0].value;
                            newUser.save(function(err){
                                if (err)
                                    throw err;
                                req.user=newUser;
                                next();
                            });
                            //console.log(req.guser);
                        }
            //done(null, profile, tokens);
                
            }); //findOne
                
            }
           
        });//plus.people.get
};