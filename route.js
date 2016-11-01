var ubCust = require('./models/ubCust.js');
var ubBike = require('./models/ubBike.js');
var Appo = require('./models/ubAppo');
//var bodyParser = require('body-parser');
var mongoose = require('mongoose');

module.exports = function(app,passport){
//	app.use(bodyParser.json());
//	app.use(bodyParser.urlencoded({extended: true}));
	
    app.get('/auth/facebook', 
        passport.authenticate('facebook',{scope: ['photos', 'email']})
    );
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', { successRedirect: '/api/getprofauth',
                                          failureRedirect: '/' }));
    app.get('/auth/google', 
        passport.authenticate('google',{scope:  ['email','profile']})
    );
            
    app.get('/auth/google/callback',
            passport.authenticate('google', {failureRedirect: '/'}),
           function(req, res) {
            console.log('auth success!! ',req.isAuthenticated(),req.user);
            res.redirect('/');
            }
        );
    
    function isLoggedIn(req,res,next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            {
                console.log('isAuthenticated Success');
                return next();    
            }
        else{
            console.log('req.user:',req.user);
            console.log('isAuthenticated Failure');
            res.redirect('/');
        }
        // if they aren't redirect them to the home page
    }//isLoggedIn
	//section to register bike
	
	app.post('/api/regbike*',function(req,res){
		ubBike.find({email:req.query.email,regno:req.query.regno},
		function(err,bikes){
            if(err) throw err;
			if(bikes.length==0){
				//create a bike
				ubBike.create({ 
					brand: req.query.models,
					model: req.query.model,
					year : req.query.year,
					kms  : 0,
					regno : req.query.regno,
					cust : req.query.usr_id
				},function(err,results){
					if(err) throw err;
					console.log(results);
                    res.send('Bike Registered');
				});
			}
			else
			{
			 res.send('Bike already registered');
			}
		});
	});
	
    //api to get all registered bikes
    
    app.get('/api/getbikes*',function(req,res){
        console.log('In getbikes api');
       // console.log('req.query :',req.query);
        var msg="";
		ubBike
            .find({cust:req.query._id})
            .populate('cust','email')
            .exec(function(err,bikes){
                  res.send(bikes);
                if(err) throw err;
            });
	});
    
   
    app.get('/api/getbikeappo*',function(req,res){
        console.log('In getbikeappo api');
        //console.log('req.query._id',mongoose.Types.ObjectId(req.query._id));
       // console.log('req.query :',req.query);
        var msg="";
        //.find({cust:req.query._id})
        //.populate('cust','email')
        ubBike.aggregate([
                {
                    "$match":
                    {
                        "cust" : mongoose.Types.ObjectId(req.query._id)
                    }
                },
                {
                    "$lookup":
                    {
                        "from": "appos",
                        "localField": "_id",
                        "foreignField": "bike",
                        "as" : "appointments"
                    }
                },
                {
                    "$match":
                    {
                        "appointments.status": { "$ne": "Booked" }
                    }
                }
            ])
            .exec(function(err,bikes){
                //console.log('bikes',bikes);
                  res.send(bikes);
                if(err) throw err;
            });
	}); 
	
    
	//section to remove a bike
	
	app.delete('/api/delbike*',function(req,res){
		ubBike.remove({regno:req.query.regno,cust:req.query.usr_id},
            function(err,results){
			if(err) throw err;
			 if(results.result.n==0)
				 {
				res.send('Bike not registered');
				 }
				else
				{
				res.send(req.query.regno+ ' deleted!!');
				}
			});
		});
    
    	app.post('/api/updprof*',function(req,res){
        console.log("In update profile api");
		var query = {_id: req.query._id};
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
	   });
	
    //section to retreive appointments
	app.get('/api/vappos*',function(req,res){
		console.log("In view appointment api");
        Appo.find({cust:req.query._id})
            .populate({
            path : 'bike',
            select: 'brand model regno'
        })
            //.populate('cust')
            .exec(function(err,results){
			if(err) throw err;
			 if(results.length==0 ||results.length==null)
			 {
				results.msg = 'No Appointments available';
                res.send(results);	 
			 }
			 else{
                //console.log('appointment results',results);
				res.send(results);	 
			 }
			
			});
	});
    
    //section to create an appointment
	
	app.post('/api/cappos*',function(req,res){
		Appo.findOne({cust:req.query._id,regno:req.query.regno},
			function(err,results){
			if(results!==null){
				 res.send('Bike already has an appointment');
				}
				else{
                    console.log('user email:',req.query.usr_email);
					Appo.create({
					appoidt:req.query.appoidt,
                    reqdt:new Date(),
                    status:'Booked',
                    bike:req.query._id,
                    cust:req.query.usr_id
					
					},function(err,results){
						if(err) throw err
                        //include email code here
                        mailController(app);
						res.send('Appointment Booked.Thank you!!');
					})
				}
						
		});
	});
    
    	//section to update an appointment
	app.post('/api/uappos*',function(req,res){
		Appo.findOneAndUpdate({email:req.params.uid,regno:req.params.reg},
				{servicedt : req.params.dt},
								{new: true},
				function(err,results){ 
				
				if(err) throw err;
				res.send(results);
				
				});  
				
	});
	
	//section to delete an appointment
	app.delete('/api/dappos*',function(req,res){
		Appo.remove( {email:req.query.email,regno:req.query.regno},
					 function(err,results){
					if(err) throw err;
					 	if(results.result.n !== 0){
						res.send('appointment deleted');		
						}
						else
						{
						res.send('appointment already deleted');
						}
					
		});
		
	});
    
    
    
    app.get('/api/getprofauth',isLoggedIn,function(req,res){
		console.log('In getprofile authentication api');
        //console.log('req.query :',req.query);
        
		ubCust.findOne({email: req.query.email},function(err,usr){
			if(err) throw err;
			if (usr == null){
				console.log('New User will be created');
                
                ubCust.create({email: req.query.email,fname:req.query.first_name,lname:req.query.last_name,gender:req.query.gender},
                       function(err,result){
                       if (err) throw err;
                       result.msg = "User profile created for "+req.query.first_name;
                       console.log(result.msg);
                        res.send(result);
                        });//create
			}
			else {
				usr.msg = "Welcome back "+ usr.fname + " !!";
               // console.log('usr:',usr);
                res.send(usr);                
			}
		});
		
	});
     
    
	
};//module exports
