var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var custSchema = new Schema(
{
	email : String,
	fname : String,
	lname : String,
	phone : String,
	address : String,
	apartment : String,
	city : String,
	pincode : String,
	gender : String
})

var Customer = mongoose.model('Customer',custSchema);

module.exports = Customer;