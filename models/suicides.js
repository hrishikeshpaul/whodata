var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	country:{type:String},
	year:{type:Number},
	sex:{type:String},
	age:{type: String},
	suicides_no:{type:Number},
	population:{type:Number}
});

module.exports = mongoose.model('Suicides', schema);
