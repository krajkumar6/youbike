var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
//var setupController = require('./controllers/setupController.js');
var apiController = require('./controllers/apiController.js');
var apibike = require('./controllers/apibike.js');
var appoController = require('./controllers/appoController.js');
//var mailController = require('./controllers/mailController.js');

var port = process.env.PORT||3000;

app.use(express.static(__dirname+ '/public'));

app.set('view engine','ejs');


app.get('/',function(req,res){
//redirecting request to home page '/' to index page 
	res.redirect('/index.htm');
});

mongoose.connect(config.getDBConnectionString());

//setupController(app);
apiController(app);
apibike(app);
appoController(app);
mailController(app);
app.listen(port);
