var Appo = require('../models/ubAppo');
var bodyParser = require('body-parser');
//var mailController = require('./controllers/mailController.js');

module.exports = function(app,passport){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	
	//section to retreive appointments
	app.get('/api/vappos*',
	passport.authenticate(['facebook-token','google-token'],{session: false}),
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
	
	app.post('/api/cappos*',
	passport.authenticate(['facebook-token','google-token'],{session: false}),
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
	app.post('/api/uappos*',
	passport.authenticate(['facebook-token','google-token'],{session: false}),
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
	app.delete('/api/dappos*',
	passport.authenticate(['facebook-token','google-token'],{session: false}),
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