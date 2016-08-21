var Orders = require('../models/ubOrders');
var bodyParser = require('body-parser');

module.exports = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	
	//section to retreive orders
	app.get('/api/vorders/:uid',function(req,res){
		Orders.find({email:req.params.uid},
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
	
	//section to create an order
	
	app.post('/api/corder/:uid/:reg',function(req,res){
		Orders.findOne({email:req.params.uid,regno:req.params.reg},
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
	
	//section to update an order
	app.post('/api/uorder/:uid/:reg/:dt',function(req,res){
		Orders.findOneAndUpdate({email:req.params.uid,regno:req.params.reg},
				{servicedt : req.params.dt},
								{new: true},
				function(err,results){ 
				
				if(err) throw err;
				res.send(results);
				
				});  
				
	});
	
	//section to delete an order
	app.delete('/api/dorder/:uid/:reg',function(req,res){
		Orders.remove( {email:req.params.uid,regno:req.params.reg},
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