angular.module('gisApp').controller('IndexController', function($scope, $rootScope, $http, $interval, $timeout, $window, $q) {
    $scope.allLayers = []
    $scope.allCountries = []
    $scope.gj = []
    $http.get('/countryData').then(function(response) {
        $scope.allData = response;
        $scope.mymap = L.map('mapid').setView([-2.688, 4.43], 2);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 5,
            minZoom: 2,
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
                            layer.on('mouseover', function(e) {
                                this.openPopup();
                            });
                            layer.on('mouseout', function(e) {
                                this.closePopup();
                            });
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
        var colors = ['#ffffe0', '#fff6cf', '#ffedbf', '#ffe5b2', '#ffdca5', '#ffd399', '#ffc98f', '#ffbf86', '#ffb57e', '#ffac77', '#ffa072', '#ff956d', '#fd8c69', '#fa8266', '#f67863', '#f26f60', '#ed655d', '#e85b59', '#e35256', '#dd4852', '#d7404e', '#d03649', '#c92e43', '#c1253d', '#b91c35', '#b1142d', '#a80c25', '#9e051b', '#960110', '#8b0000']
        return d > 30000 ? colors[29] :
            d > 25000 ? colors[28] :
            d > 20000 ? colors[27] :
            d > 19000 ? colors[26] :
            d > 18000 ? colors[25] :
            d > 16000 ? colors[24] :
            d > 15000 ? colors[23] :
            d > 14000 ? colors[22] :
            d > 13000 ? colors[21] :
            d > 12500 ? colors[20] :
            d > 12000 ? colors[19] :
            d > 11500 ? colors[18] :
            d > 11000 ? colors[17] :
            d > 10500 ? colors[16] :
            d > 10000 ? colors[15] :
            d > 9500 ? colors[14] :
            d > 9000 ? colors[13] :
            d > 8500 ? colors[12] :
            d > 8000 ? colors[11] :
            d > 7000 ? colors[10] :
            d > 6000 ? colors[9] :
            d > 5000 ? colors[8] :
            d > 4000 ? colors[7] :
            d > 3000 ? colors[6] :
            d > 2000 ? colors[5] :
            d > 1000 ? colors[4] :
            d > 750 ? colors[3] :
            d > 500 ? colors[2] :
            d > 100 ? colors[1]:
            colors[0]
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
                            layer.on('mouseover', function(e) {
                                this.openPopup();
                            });
                            layer.on('mouseout', function(e) {
                                this.closePopup();
                            });
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
                            layer.on('mouseover', function(e) {
                                this.openPopup();
                            });
                            layer.on('mouseout', function(e) {
                                this.closePopup();
                            });
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
            $scope.lb.style.visibility = "hidden"
            var sel = document.getElementById("yearList");
            sel.value = $scope.start;

        }
    }

    $scope.regionSelect = function () {
        var sel = document.getElementById("regionSelect");
        var value = sel.options[sel.selectedIndex].value;

        if(value == "North America"){
            $scope.mymap.setView([48.166666 ,-100.166666], 4);
        } else if(value == "South America"){
            $scope.mymap.setView([-30.206283, -57.849463],4);
        } else if(value == "Asia"){
            $scope.mymap.setView([41.890515, 91.530142],3);
        } else if(value == "Europe"){
            $scope.mymap.setView([49.213900, 13.118821],4);
        } else if(value == "Africa"){
            $scope.mymap.setView([-2.751046, 22.534352],4);
        } else if(value =="Australia"){
            $scope.mymap.setView([-30.389241, 134.307407],5);
        }
    }

});