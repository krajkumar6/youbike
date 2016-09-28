var Appo = require('../models/ubAppo');
var bodyParser = require('body-parser');

module.exports = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	
	//section to retreive appointments
	app.get('/api/vappos*',function(req,res){
		Appo.find({email:req.query.email},
			function(err,results){
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
		Appo.findOne({email:req.params.uid,regno:req.params.reg},
			function(err,results){
			if(results!==null){
				 res.send('Bike already has an appointment');
				}
				else{
					Orders.create({
					email:	req.params.uid,
					regno: 	req.params.reg,
					status : 'Booked',
					servicedt: "2016-08-16"
					},function(err,results){
						if(err) throw err
						res.send(results);
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
		Appo.remove( {email:req.params.uid,regno:req.params.reg},
					 function(err,results){
					if(err) throw err;
					 	if(results.result.n !== 0){
						res.send(results);		
						}
						else
						{
						res.send('appointment already deleted');
						}
					
		});
		
	});
	
};