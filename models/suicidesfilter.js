var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	country:{type:String},
	year:{type:Number},
	suicides_no:{type:Number},
});

module.exports = mongoose.model('SuicidesFilter', schema);
