var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Apposch = new Schema(
	{
	appoidt : Date,
    reqdt : Date,
	status : String,
	bike : { type: Schema.Types.ObjectId, ref: 'Bike' },
    cust : { type: Schema.Types.ObjectId, ref: 'Customer' },
    lastUpddt : { type: Date, default: Date.now }
}
);

var appos = mongoose.model('appos',Apposch);

module.exports = appos;