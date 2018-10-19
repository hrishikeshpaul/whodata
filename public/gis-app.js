angular.module("gisApp", [], function($interpolateProvider) { // create module gisApp
            $interpolateProvider.startSymbol('[{')
            $interpolateProvider.endSymbol('}]')
})

