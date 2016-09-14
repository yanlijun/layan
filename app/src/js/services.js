'use strict';

/* App Services */
/* http://docs.angularjs.org/#!angular.service */

angular.module('myApp.services', [])
    .factory('Nav', ['$resource', function($resource) {
        return $resource('data/nav.json');
    }])
    .factory('Videos', ['$resource', function($resource) {
        return $resource('data/videos_:navId.json', {}, {
            query: {method: 'GET', params: {navId: 'all'}, isArray: true}
        });
    }])
    .factory('Video', ['$resource', function($resource) {
        return $resource('data/videos_:navId-:id.json');
    }])
    .factory('Source', ['$resource', function($resource) {
        return $resource('data/source_:id.json');
    }]);
