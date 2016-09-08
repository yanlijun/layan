'use strict';

/* App Services */
/* http://docs.angularjs.org/#!angular.service */

angular.module('myApp.services', [])
    .factory('Phone', function($resource){
        return $resource('phones/:id.json', {}, {
            query: {method:'GET', params:{id:'phones'}, isArray:true}
        });
    });
