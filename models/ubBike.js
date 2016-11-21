var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Bikesch= new Schema(
{
	brand: String,
	model: String,
	year : String,
	kms  : Number,
	regno : String,
	cust : { type: Schema.Types.ObjectId, ref: 'Customer' },
    lastUpddt : { type: Date, default: Date.now }
}
);

var Bike = mongoose.model('Bike',Bikesch);

module.exports = Bike;