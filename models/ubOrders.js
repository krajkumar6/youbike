var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var Ordersch = new Schema(
	{
	servicedt : Date,
	status : String,
	regno : String,
	email : String
}
);

var orders = Mongoose.model('orders',Ordersch);

module.exports = orders;