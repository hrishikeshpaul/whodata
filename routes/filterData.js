var SuicidesFilter = require('../models/suicidesfilter')
var express = require('express');
var router = express.Router();

module.exports = function () {
	Suicides.find({},function (err,data) {
			if(err)
				throw err
			else{
				for(var y = 0 ; y < 141 ; y++){
					for(var x = 0 ; x < 31 ; x++){
						var count = 0;
					data.forEach(function (i) {
						if(i.country == allCountries[y] && i.year==allYears[x]){
							count = count + i.suicides_no;
						}
					})
					var newData = new SuicidesFilter({
						country:allCountries[y],
						year:allYears[x],
						suicides_no:count
					}).save(function (err,response) {
							if(err)
								throw err
							console.log("done -> "+allCountries[y])
					})
				}
				}
			}
		})
		// 	Suicides.find({}).distinct('country',function (err,countries) {
	// 	if(err)
	// 		throw err
	// 	allCountries = countries;
	// 	console.log(util.inspect(allCountries, { maxArrayLength: null }))
	// })

}
