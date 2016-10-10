var ubBike = require('../models/ubBike.js');
var bodyParser = require('body-parser');

module.exports = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	
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
    
    //api to get bikes which does not have appointment
    
    app.get('/api/getbikeappo*',function(req,res){
        console.log('In getbikeappo api');
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
   /* app.get('/api/getbikeappo*',function(req,res){
        console.log('In getbikeappo api');
       // console.log('req.query :',req.query);
        var msg="";
        //.find({cust:req.query._id})
        //.populate('cust','email')
        ubBike.aggregate([
                {
                    $match:
                    {
                        cust : req.query._id
                    }
                },
                {
                    $lookup:
                    {
                        from: "appos",
                        localField: "_id",
                        foreignField: "bike",
                        as : "appointments"
                    }
                },
                {
                    $match:
                    {
                        "appointments" : {$eq : []}
                    }
                }
            ])
            .exec(function(err,bikes){
                console.log('bikes',bikes);
                  res.send(bikes);
                if(err) throw err;
            });
	}); */
	
    
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
	
	
};//module exports