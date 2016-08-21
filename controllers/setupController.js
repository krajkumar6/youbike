var cust = require('../models/ubModel.js');

module.exports = function (app){
	
	app.get('/api/profupdate',function(req,res){
		
	var custdata =[
		{
			email : "krajkumar6@gmail.com",
			phone : "9884831042",
			address : "C35074",
			apartment :"DLF Gardencity",
			city : "Chennai",
			pincode : "600130"
		},
		{
			email : "roger@gmail.com",
			phone : "7143874007",
			address : "C26074",
			apartment :"DLF Gardencity",
			city : "Chennai",
			pincode : "600130"
		},
		{
			email : "Djokovic@gmail.com",
			phone : "1743861045",
			address : "C01044",
			apartment :"DLF Gardencity",
			city : "Chennai",
			pincode : "600130"
		}
	];
		
	cust.create(custdata,function(err,results){
		if(err) throw error;
		res.send(results);
	});
	
});

}