angular.module('gisApp').controller('AddDataController', function($scope, $rootScope, $http, $interval, $timeout, $window) {
   	
 	$scope.addData = function () {

 		//var data = {country:country, playerName:pn, playerNumber:pno}
 		console.log("hi")
 		$http
 				.post('/ad')
 				.then(function (data) {
 					console.log(data)
 				})
 	}
 })