var Appo = require('../models/ubAppo');
var bodyParser = require('body-parser');
var gCtrl = require('./googleController.js');
var mailController = require('./mailController.js');

module.exports = function(app,passport){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	
	//section to retreive appointments
	app.get('/api/vapposfb',
	passport.authenticate('facebook-token',{session: false}),
	function(req,res){
		if(req.user){
			console.log("In view appointment api");
        	Appo.find({cust:req.user._id})
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
		}
		else
		{
			res.send(401);
		}
		
	});
	
    app.get('/api/vapposgo',
	gCtrl,
	function(req,res){
		if(req.user){
			console.log("In view appointment api");
        	Appo.find({cust:req.user._id})
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
		}
		else
		{
			res.send(401);
		}
		
	});
	//section to create an appointment
	
	app.post('/api/capposfb',
	passport.authenticate('facebook-token',{session: false}),
	function(req,res){
		if(req.user){
            console.log(req.query);
			Appo.findOne({cust:req.user._id,regno:req.query.regno},
			function(err,results){
			if(results!==null){
				 res.send('Bike already has an appointment');
				}
				else{
                    //console.log('user email:',req.query.usr_email);
					Appo.create({
					appoidt:req.query.appoidt,
                    reqdt:new Date(),
                    status:'Booked',
                    bike:req.query._id,
                    cust:req.query.usr_id					
					},function(err,results){
						if (err) 
                                {
                                    throw err;
                                    res.send(err);
                                }
                        console.log('appointment object', results);
                        Appo
                        .findOne({_id:results._id})
                        .populate({
                            path : 'bike cust',
                            select:'brand model year regno email'
                        })
                        .exec(function(err,results){
                            if (err) 
                                {
                                    throw err;
                                    res.send(err);
                                }
                            console.log('email object', results);
                            mailController(results);
						    res.send('Appointment Booked.Thank you!!');
                        });
                        
                        //include email code here
                        
					})
				}
						
			});
		}
		else
		{
			res.send(401);
		}
		
	});
    
    app.post('/api/capposgo',
	gCtrl,
	function(req,res){
		if(req.user){
			Appo.findOne({cust:req.user._id,regno:req.query.regno},
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
                        //mailController(app);
						res.send('Appointment Booked.Thank you!!');
					})
				}
						
			});
		}
		else
		{
			res.send(401);
		}
		
	});
	
	//section to update an appointment
	app.post('/api/uapposfb',
	passport.authenticate('facebook-token',{session: false}),
	function(req,res){
		if(req.user){
			Appo.findOneAndUpdate({cust:req.user._id,regno:req.query.reg},
				{servicedt : req.query.dt},
								{new: true},
				function(err,results){ 
				
				if(err) throw err;
				res.send(results);
				
				});
		}
		else
		{
			res.send(401);
		}
		  
				
	});
	
    app.post('/api/uapposgo',
	gCtrl,
	function(req,res){
		if(req.user){
			Appo.findOneAndUpdate({cust:req.user._id,regno:req.query.reg},
				{servicedt : req.query.dt},
								{new: true},
				function(err,results){ 
				
				if(err) throw err;
				res.send(results);
				
				});
		}
		else
		{
			res.send(401);
		}
		  
				
	});
	//section to delete an appointment
	app.delete('/api/dapposfb',
	passport.authenticate('facebook-token',{session: false}),
	function(req,res){
		if(req.user){
			Appo.remove( {cust:req.user._id,regno:req.query.regno},
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
			}
			else
			{
				res.send(401);
			} 
		});
		
    app.delete('/api/dapposgo',
	gCtrl,
	function(req,res){
		if(req.user){
			Appo.remove( {cust:req.user._id,regno:req.query.regno},
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
			}
			else
			{
				res.send(401);
			} 
		});
		
	
};