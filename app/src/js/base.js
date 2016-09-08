'use strict';

// Declare app level module which depends on views, and components

angular.module('myApp', [
    'ngRoute',
    'myApp.controllers',
    'myApp.services',
    'myApp.directives',
    'myApp.filters',
    'myApp.version'
])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        //$locationProvider.html5Mode(true);

        $routeProvider
            .when('/view1', {templateUrl: 'view1/view1.html', controller: 'View1Ctrl'})
            .when('/view2', {templateUrl: 'view2/view2.html', controller: 'View2Ctrl'})
            .otherwise({redirectTo: '/view1'});

    }]);
