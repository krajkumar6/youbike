var ubCust = require('../models/ubCust.js');
var bodyParser = require('body-parser');

var guestmenu =['Services','Contact','About','Register/Login','Appointments'];
var usermenu=['Profile',' Appointments','Orders','About' ,'Contact','Services','Logout'];

module.exports = function (app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));

    //check profile api to check whether user profile exists or not using fb response object.if it exists return profile otherwise create profile
    app.get('/api/getprofauth*',function(req,res){
		console.log('In getprofile authentication api');
        //console.log('req.query :',req.query);
        
		ubCust.findOne({email: req.query.email},function(err,usr){
			if(err) throw err;
			if (usr == null){
				console.log('New User will be created');
                
                ubCust.create({email: req.query.email,fname:req.query.first_name,lname:req.query.last_name,gender:req.query.gender},
                       function(err,result){
                       if (err) throw err;
                       result.msg = "User profile created for "+req.query.first_name;
                       console.log(result.msg);
                        res.send(result);
                        });//create
			}
			else {
				usr.msg = "Welcome back "+ usr.fname + " !!";
               // console.log('usr:',usr);
                res.send(usr);                
			}
		});
		
	});
    
	
	//section to Update user profile information
	app.post('/api/updprof*',function(req,res){
        console.log("In update profile api");
		var query = {_id: req.query._id};
		console.log('query object:',req.query);
        console.log('query',query);
        ubCust.findOneAndUpdate(query,
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
            usr.msg="User Profile Updated!!";
            res.send(usr);
		});
	});
	
	//section to Read user profile information
	/*app.get('/api/getprof*',function(req,res){
		console.log('In getprofile api');
        console.log('req.query :',req.query);
        
		ubCust.findOne({id: req.query._id},function(err,usr){
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
		
	});*/
	
};