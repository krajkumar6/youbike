var ubModel = require('../models/ubModel.js');
var bodyParser = require('body-parser');

var guestmenu =['Services','Contact','About','Register/Login','Appointments'];
var usermenu=['Profile',' Appointments','Orders','About' ,'Contact','Services','Logout'];

module.exports = function (app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	
	//section to signup user & authorize 
	app.get('/api/creaprof*',function(req,res){
		//var msg="In create profile API";
        console.log(req.query.email);
		ubModel.find({email: req.query.email},function(err,usr){
			if(err) throw err;
			if (usr.length == 0){
				console.log('user not available. will be created');
                    ubModel.create({email: req.query.email,fname:req.query.first_name,lname:req.query.last_name,gender:req.query.gender},
                   function(err,result){
                   if (err) throw err;
                   msg = "User profile created for "+req.query.first_name;
                   console.log(msg);
                    res.send(msg);
                    });
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
		console.log('query:'+req.query.email);
        ubModel.findOneAndUpdate(query,
			{
				fname : req.body.fname,
				lname : req.body.lname,
				phone : req.body.cell,
				add1 : req.body.add1 ,
                add2 : req.body.add2, 
			    city : req.body.city,
				pincode : req.body.pin
			},
			function(err,usr){
			if(err) throw err;
			res.send(usr);
		});
	});
	
	//section to Read user profile information
	app.get('/api/getprof*',function(req,res){
		
		ubModel.findOne({email: req.query.email},function(err,usr){
			if(err) throw err;
			if (usr.length == 0){
				res.send('Invalid user');
			}
			else {
				res.send(usr);
			}
		});
		
	});
	
};