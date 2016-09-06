var ubBike = require('../models/ubBike.js');
var bodyParser = require('body-parser');

module.exports = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	
	//section to register bike
	
	app.post('/api/regbike/*',function(req,res){
		ubBike.find({email:req.query.email,regno:req.query.regno},
		function(err,bikes){
            if(err) throw err;
			if(bikes.length==0){
				//create a bike
				ubBike.create({ 
					brand: req.query,
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
	
    //api to get all registered bikes
    
    app.get('/api/getbike*',function(req,res){
        console.log('In getbike api');
        console.log('req.query :',req.query);
        var msg="";
		ubBike.find({email:req.query.email},
            function(err,bikes){
                  res.send(bikes);
                if(err) throw err;
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