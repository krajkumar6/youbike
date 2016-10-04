var ubModel = require('../models/ubModel.js');
var bodyParser = require('body-parser');

var guestmenu =['Services','Contact','About','Register/Login','Appointments'];
var usermenu=['Profile',' Appointments','Orders','About' ,'Contact','Services','Logout'];

module.exports = function (app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	
	//section to signup user & authorize 
	app.post('/api/creaprof*',function(req,res){
		//var msg="In create profile API";
        console.log(req.query.email);
		ubModel.find({email: req.query.email},function(err,usr){
			if(err) throw err;
			if (usr == null){
				console.log('user not available. will be created');
                    ubModel.create({email: req.query.email,fname:req.query.first_name,lname:req.query.last_name,gender:req.query.gender},
                       function(err,result){
                       if (err) throw err;
                       result.msg = "User profile created for "+req.query.first_name;
                       console.log(msg);
                        res.send(result);
                        });//create
			}
			else {
                msg = "Welcome back "+ req.query.first_name + " !!";
                console.log(msg);
                res.send(msg);
			}
            
		});
		 
	});
	
	//section to Update user profile information
	app.post('/api/updprof*',function(req,res){
		var query = {email: req.query.email};
		console.log('query object:',req.query);
        ubModel.findOneAndUpdate(query,
			{
				fname : req.query.fname,
				lname : req.query.lname,
				phone : req.query.phone,
				add1 : req.query.add1,
                add2 : req.query.add2, 
			    city : req.query.city,
				pincode : req.query.pincode
			},
			function(err,usr){
			if(err) throw err;
                res.send('User Profile Updated!!');
		});
	});
	
	//section to Read user profile information
	app.get('/api/getprof*',function(req,res){
		console.log('In getprofile api');
        console.log('req.query :',req.query);
        
		ubModel.findOne({id: req.query._id},function(err,usr){
			if(err) throw err;
			if (usr == null){
				console.log('New User will be created');
                res.send(null);
			}
			else {
				
                console.log('usr:',usr);
                res.send(usr);
                
			}
		});
		
	});
	
};