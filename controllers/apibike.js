var ubBike = require('../models/ubBike.js');
var bodyParser = require('body-parser');

module.exports = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	
	//section to register bike
	
	app.post('/api/regbike/:uid/:reg',function(req,res){
		ubBike.find({email:req.params.uid,regno:req.params.reg},
		function(err,bikes){
			if(bikes.length==0){
				//create a bike
				ubBike.create({ 
					brand: 'Honda',
					model: 'Activa',
					year : '2012',
					kms  : 3000,
					regno : 'TN02M3488',
					email : req.params.uid
				},function(err,results){
					if(err) throw err;
					res.send(results);
				});
			}
			else
			{
			 res.send('Same bike cannot be registered again');
			}
		});
	});
	
	//section to remove a bike
	
	app.delete('/api/delbike/:reg',function(req,res){
		ubBike.remove({regno:req.params.reg},function(err,results){
			if(err) throw err;
			 if(results.result.n==0)
				 {
				res.send('Bike not registered');
				 }
				else
				{
				res.send('Success');
				}
			});
		});
	
	
};//module exports