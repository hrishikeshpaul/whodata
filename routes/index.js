var express = require('express');
var router = express.Router();
var MobileActivity = require('../models/mobile_activity')
var Suicides = require('../models/suicides')
var GeoData = require('./countries.geo.json')
var allYears = require('./allyears.js')
var allCountries = require('./allcountries.js')
const util = require('util')
var SuicidesFilter = require('../models/suicidesfilter')

var albania = {}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,layout:'layouts/index-layout'});
});

router.get('/countryData',function (req,res,next) {
	var data = GeoData;
	res.send(data)
})

router.post('/getData',function (req,res,next) {
	var initYear = req.body.year;
	//console.log(initYear)
	SuicidesFilter.find({year:initYear},function (err,data) {
		if(err)
			throw err
		res.send(data)
	})
})

router.get('/initData',function (req,res,next) {

	SuicidesFilter.find({year:1985},function (err,data) {
		if(err)
			throw err
		res.send(data)
	})
})

module.exports = router;
