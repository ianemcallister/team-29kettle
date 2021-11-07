//  MODULE
'use strict'
var ckc = angular.module('ckc', ['ngRoute', 'ngSanitize', 'firebase', '720kb.datepicker', 'angularMoment']);

ckc.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);