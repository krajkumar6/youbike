var ubCust = require('../models/ubCust.js');
var bodyParser = require('body-parser');

var guestmenu =['Services','Contact','About','Register/Login','Appointments'];
var usermenu=['Profile',' Appointments','Orders','Logout'];

module.exports = function (app,passport){
	//app.use(bodyParser.json());
	//app.use(bodyParser.urlencoded({extended:true}));

    //check profile api to check whether user profile exists or not using fb response object.if it exists return profile otherwise create profile
    app.post('/auth/facebook/accesstoken',
      passport.authenticate('facebook-token',{session: false}),
      function (req, res) {
        // do something with req.user
        if(req.user){
            req.user.menu=usermenu;
            console.log('fb user authenticated');
            res.send(req.user);
        }
        else{
            console.log('no entry');
            res.send(401);
        }
      }
    );
    
   	
	//section to Update user profile information
	app.post('/api/updprof*',
		passport.authenticate('facebook-token',{session: false}),
		function(req,res){
			if(req.user){
				console.log("In update profile api");
				var query = {_id: req.user._id};
				console.log('query object:',req.query);
				console.log('query',query);
				ubCust.findOneAndUpdate(query,
					{
						fname : req.query.fname,
						lname : req.query.lname,
						phone : req.query.phone,
						add1 : req.query.add1,
						add2 : req.query.add2, 
						city : req.query.city,
						pincode : req.query.pincode
					},
					function(err,usr){
					if(err) throw err;
					usr.msg="User Profile Updated!!";
					res.send(usr);
				});
			}        
			else
			{
				res.send(401);
			}
	});
	
	//section to Read user profile information
	app.get('/api/getprof*',
            passport.authenticate('facebook-token',{session: false}),
            function(req,res){
        if(req.user){
		console.log('In getprofile api');
        console.log('req.query :',req.query);
        
		ubCust.findOne({_id: req.user._id},function(err,usr){
			if(err) throw err;
			if (usr == null){
				console.log('New User will be created');
                res.send(null);
			}
			else {
				
                console.log('usr:',usr);
                res.send(usr);
                
			}
		});
        }
        else
            {
                res.send(401);
            }
	});
};