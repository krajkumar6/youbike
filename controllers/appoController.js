var Appo = require('../models/ubAppo');
var bodyParser = require('body-parser');
//var mailController = require('./controllers/mailController.js');

module.exports = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	
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
	
};