var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var Bikesch= new Schema(
{
	brand: String,
	model: String,
	year : String,
	kms  : Number,
	regno : String,
	cust : { type: String, ref: 'Customer' }
}
);

var Bike = Mongoose.model('Bike',Bikesch);

module.exports = Bike;


