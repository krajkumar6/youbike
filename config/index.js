var configValues = require('./config.json');

module.exports = {
	
	getDBConnectionString : function(){
		return 'mongodb://'+ configValues.uname + ':' 
			+ configValues.pwd + '@ds017195.mlab.com:17195/youbike'
	}
	
}