var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var Bikesch= new Schema(
{
	brand: String,
	model: String,
	year : String,
	kms  : Number,
	regno : String,
	email : String
}
);

var Bike = Mongoose.model('Bike',Bikesch);

module.exports = Bike;


