var express = require('express');
var router = express.Router();
var dataJSON = require("./data.json")
var MobileActivity = require('../models/mobile_activity');
var Suicides = require('../models/suicides')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addData', { title: 'Express' ,layout:'layouts/add-data-layout'});
});

router.post('/',function (req,res,next) {
	var data = dataJSON;
	for(var i = 40001 ; i < 43777 ; i ++){
		var n = new Suicides(dataJSON[i]).save(function (err,n) {
			if(err)
				console.log(err)
			else
				console.log("done")
		})
	}

	
})

module.exports = router;
