var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var passport = require('passport');
//var cookieParser = require('cookie-parser');
//app.use(cookieParser());
//var session = require('express-session');
/*app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));*/

//var setupController = require('./controllers/setupController.js');
var apiController = require('./controllers/apiController.js');
var apibike = require('./controllers/apibike.js');
var appoController = require('./controllers/appoController.js');
var authController = require('./controllers/authController.js');
//var router = require('./route.js');

var port = process.env.PORT||3000;

app.use(express.static(__dirname+ '/public'));

app.set('view engine','ejs');


app.get('/',function(req,res){
//redirecting request to home page '/' to index page 
	res.redirect('/index.htm');
});

mongoose.connect(config.getDBConnectionString());




app.use(passport.initialize());
// 
//  app.use(express.bodyParser());
//  
app.use(passport.session());

var pp = require('./config/passport');
pp(passport);
//router(app,passport);
//  app.use(app.router);

apiController(app,passport);
apibike(app,passport);
appoController(app,passport);
//authController(app,passport);

app.listen(port);
