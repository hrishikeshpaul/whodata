var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	lat:{type:Number},
	lon:{type:Number},
	timestep:{type:Number},
	count:{type:Number}
});

module.exports = mongoose.model('MobileActivity', schema);