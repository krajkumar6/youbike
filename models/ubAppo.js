var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var Apposch = new Schema(
	{
	appoidt : Date,
    reqdt : Date,
	status : String,
	bike : { type: Number, ref: 'Bike' },
    cust : { type: Number, ref: 'Customer' }
}
);

var appos = Mongoose.model('appos',Apposch);

module.exports = appos;