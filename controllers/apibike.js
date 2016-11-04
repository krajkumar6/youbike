var ubBike = require('../models/ubBike.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

module.exports = function(app,passport){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	
	//section to register bike
	
	app.post('/api/regbike*',
        passport.authenticate('facebook-token',{session: false}),
        function(req,res){
            if(req.user){
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
            }
            else
            {
                res.send(401);
            }
		
	});
	
    //api to get all registered bikes
    
    app.get('/api/getbikes',
    passport.authenticate('facebook-token',{session: false}),
    function(req,res){
        if(req.user){
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
        }
        else
        {
            res.send(401);
        }
        
	});
    
    //api to get bikes which does not have appointment
    
    /*app.get('/api/getbikeappo*',function(req,res){
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
	});*/
    app.get('/api/getbikeappo*',
    passport.authenticate('facebook-token',{session: false}),
    function(req,res){
        if(req.user){
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
        }
        else
        {
            res.send(401);
        }
        
	}); 
	
    
	//section to remove a bike
	
	app.delete('/api/delbike*',
    passport.authenticate('facebook-token',{session: false}),
    function(req,res){
        if(req.user){
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
        }
        else
        {
            res.send(401);
        }

	});
        
    
		
	
	
};//module exports