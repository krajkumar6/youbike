var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var Apposch = new Schema(
	{
	appoidt : Date,
    reqdt : Date,
	status : String,
	regno : String,
	email : String
}
);

var appos = Mongoose.model('appos',Apposch);

module.exports = appos;