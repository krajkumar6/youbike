var Appo = require('../models/ubAppo');
var bodyParser = require('body-parser');

module.exports = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	
	//section to retreive appointments
	app.get('/api/vappos*',function(req,res){
		Appo.find({cust:req.query.usr_id})
            .populate('bike cust')
            .exec(function(err,results){
			if(err) throw err;
			 if(results.length==0)
			 {
				res.send('No orders available');	 
			 }
			 else{
				res.send(results);	 
			 }
			
			});
	});
	
	//section to create an appointment
	
	app.post('/api/cappos*',function(req,res){
		Appo.findOne({email:req.query.email,regno:req.query.regno},
			function(err,results){
			if(results!==null){
				 res.send('Bike already has an appointment');
				}
				else{
					Appo.create({
					appoidt:req.query.appoidt,
                    reqdt:new Date(),
                    status:'Booked',
                    bike:req.query._id,
                    cust:req.query.usr_id
					
					},function(err,results){
						if(err) throw err
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
	
};