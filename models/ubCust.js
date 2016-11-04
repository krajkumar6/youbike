var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var custSchema = new Schema(
{
	email : String,
	fname : String,
	lname : String,
	phone : String,
	add1 : String,
	add2 : String,
	city : String,
	pincode : String,
	gender : String,
    facebook : {
        id: String,
        token : String,
        name : String
    },
    google : {
        id: String,
        token : String,
        name : String
    }
})

var Customer = mongoose.model('Customer',custSchema);

module.exports = Customer;