'use strict';

// Declare app level module which depends on views, and components

angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'myApp.controllers',
    'myApp.services',
    'myApp.directives',
    'myApp.filters',
    'myApp.version'
])
    .config(['$locationProvider', '$routeProvider', '$sceDelegateProvider', function($locationProvider, $routeProvider, $sceDelegateProvider) {
        $locationProvider.hashPrefix('!');
        //$locationProvider.html5Mode(true);

        $routeProvider
            .when('/videos/:navId', {templateUrl: 'templates/video-list.html', controller: 'ListCtrl'})
            .when('/videos/:navId/:videoId', {templateUrl: 'templates/video-detail.html', controller: 'DetailCtrl'})
            .otherwise({redirectTo: '/videos/all'});
            
        $sceDelegateProvider.resourceUrlWhitelist([
       // Allow same origin resource loads.
       'self',
       // Allow loading from our assets domain.  Notice the difference between * and **.
       'http://7xu8zs.com1.z0.glb.clouddn.com/**',
	   'http://ogqa7iysz.bkt.clouddn.com/**']);

    }]);
