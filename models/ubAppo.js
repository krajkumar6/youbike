var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var Apposch = new Schema(
	{
	appoidt : Date,
    reqdt : Date,
	status : String,
	bike : { type: String, ref: 'Bike' },
    cust : { type: String, ref: 'Customer' }
}
);

var appos = Mongoose.model('appos',Apposch);

module.exports = appos;