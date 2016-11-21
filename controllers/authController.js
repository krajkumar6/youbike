//var bodyParser = require('body-parser');

module.exports = function(app,passport){
    //app.use(bodyParser.json());
	//app.use(bodyParser.urlencoded({extended:true}));
    
    app.get('/auth/facebook', 
        passport.authenticate('facebook',{scope: ['photos', 'email']})
    );
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', { successRedirect: '/api/getprofauth',
                                          failureRedirect: '/' }));
    
   /* app.get('/auth/google', 
        passport.authenticate('google',{scope:  ['email','profile']})
    );
            
    /*app.get('/auth/google/callback',
            passport.authenticate('google', {failureRedirect: '/'}),
           function(req, res) {
            console.log('auth success!! ',req.isAuthenticated(),req.user);
            res.redirect('/api/getprofauth');
            }
        );
   /* app.get('/auth/google/callback',
            passport.authenticate('google'),
            function(req,res,next){
                console.log('req.user:',req.user);
                res.send(req.user);
            }
            
        );*/
    
    
    
    function isLoggedIn(req,res,next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            {
                console.log('isAuthenticated Success');
                return next();    
            }
        else{
            console.log('req.user',req.user,req.isAuthenticated());
            console.log('isAuthenticated Failure');
            res.redirect('/');
        }
        // if they aren't redirect them to the home page
    }//isLoggedIn
}

