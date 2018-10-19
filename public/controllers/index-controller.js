angular.module('gisApp').controller('IndexController', function($scope, $rootScope, $http, $interval, $timeout, $window, $q) {
    $scope.allLayers = []
    $scope.allCountries = []
    $scope.gj = []
    $http.get('/countryData').then(function(response) {
        $scope.allData = response;
        $scope.mymap = L.map('mapid').setView([-5.688, 35.43], 2);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 25,
            minZoom: 1,
            id: 'mapbox.light',
            accessToken: 'pk.eyJ1IjoiaHJpc2hpa2VzaHBhdWwiLCJhIjoiY2puYmhpcDZ4MDQwZTNwcGUzc2czN2J4ZyJ9.IbxCwKm3S1BR9SOGwW5waA'
        }).addTo($scope.mymap);

        $scope.allGeoLayer = L.geoJson(response.data).addTo($scope.mymap);

        $http
            .get('/initData')
            .then(function(data) {
                $scope.mymap.removeLayer($scope.gj)
                var requests = []
                for (var files of data.data) {
                    //console.log(files.suicides)
                    var deffered = $q.defer();
                    requests.push(deffered);
                    $scope.gj = L.geoJson(response.data, {
                        filter: function(feature, layer) {
                            return feature.properties.name == files.country

                        },
                        style: function(feature) {
                            return {
                                fillColor: getColor(files.suicides_no),
                                weight: 2,
                                opacity: 1,
                                color: 'white',
                                dashArray: '3',
                                fillOpacity: 0.7
                            }
                        },
                        onEachFeature: function(feature, layer) {
                            layer.bindPopup('<b>Country: </b>' + files.country + '</br><b>Year: </b>' + files.year + '</br> <b>Total Suicides: </b> ' + files.suicides_no);
                        }
                    }).addTo($scope.mymap)

                }


                //after styling callback
                $q.all(requests).then(function() {
                    console.log("done")
                    //var layerGroup = L.layerGroup($scope.allLayers);

                })


            })
    });

    function getColor(d) {
        return d > 30000 ? '#ff6347' :
            d > 20000 ? '#f86e47' :
            d > 10000 ? '#f17947' :
            d > 5000 ? '#eb8447' :
            d > 4500 ? '#e48f47' :
            d > 4000 ? '#de9a47' :
            d > 3750 ? '#d7a547' :
            d > 3500 ? '#d1b147' :
            d > 3250 ? '#cabc47' :
            d > 2000 ? '#c3c747' :
            d > 2500 ? '#bdd247' :
            d > 2000 ? '#b6dd47' :
            d > 1500 ? '#b0e847' :
            d > 1250 ? '#a9f347' :
            d > 1000 ? '#a3ff47' :
            '#ffffff';
    }

    $scope.getYear = getYear;

    function getYear() {
        var sel = document.getElementById("yearList");
        var value = { year: sel.options[sel.selectedIndex].value };
        $scope.start = value.year
        $scope.mymap.removeLayer($scope.gj)
        $scope.mymap.removeLayer($scope.allGeoLayer)
        $http
            .post('/getData', value)
            .then(function(data) {
                //console.log($scope.allData.data)
                var requests = []
                for (var files of data.data) {
                    //console.log(files.suicides)
                    var deffered = $q.defer();
                    requests.push(deffered);
                    $scope.gj = L.geoJson($scope.allData.data, {
                        filter: function(feature, layer) {
                            return feature.properties.name == files.country

                        },
                        style: function(feature) {
                            return {
                                fillColor: getColor(files.suicides_no),
                                weight: 2,
                                opacity: 1,
                                color: 'white',
                                dashArray: '3',
                                fillOpacity: 0.7
                            }
                        },
                        onEachFeature: function(feature, layer) {
                            layer.bindPopup('<b>Country: </b>' + files.country + '</br><b>Year: </b>' + files.year + '</br> <b>Total Suicides: </b> ' + files.suicides_no);
                        }
                    }).addTo($scope.mymap)

                }


                //after styling callback
                $q.all(requests).then(function() {
                    console.log("done")
                    //var layerGroup = L.layerGroup($scope.allLayers);

                })


            })
    }

    function yearTimer(y) {
        var value = { year: y };
        $scope.mymap.removeLayer($scope.gj)
        $scope.mymap.removeLayer($scope.allGeoLayer)
        $http
            .post('/getData', value)
            .then(function(data) {
                for (var files of data.data) {
                    $scope.gj = L.geoJson($scope.allData.data, {
                        filter: function(feature, layer) {
                            return feature.properties.name == files.country
                        },
                        style: function(feature) {
                            return {
                                fillColor: getColor(files.suicides_no),
                                weight: 2,
                                opacity: 1,
                                color: 'white',
                                dashArray: '3',
                                fillOpacity: 0.7
                            }
                        },
                        onEachFeature: function(feature, layer) {
                            layer.bindPopup('<b>Country: </b>' + files.country + '</br><b>Year: </b>' + files.year + '</br> <b>Total Suicides: </b> ' + files.suicides_no);
                        }
                    }).addTo($scope.mymap)

                }


            })
    }

    $scope.start = 1985;
    var interval = $interval(function() {

        //console.log(start)
        yearTimer($scope.start)
        if ($scope.start == 2013)
            $scope.start = 1984
        else 
            $scope.start = $scope.start + 1
    }, 1500);

    $scope.toggleLoop = function() {
        $scope.lb = document.getElementById("loopBtn");
        if ($scope.lb.value == "Stop Loop") {
            $interval.cancel(interval)
            $scope.lb.style.visibility="hidden"
            var sel = document.getElementById("yearList");
            sel.value = $scope.start;

        } 
    }

});