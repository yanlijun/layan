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

'use strict';

/* App Controllers */

angular.module('myApp.controllers', [])
    .controller('MenuCtrl', ['$location', function($location) {
        var nav = this;
        nav.menus = [{name: 'view1', url: 'view1'}, {name: 'view2', url: 'view2'}];
        nav.showSub = function(e) {
            console.log(e.target);
        };

        nav.isActive = function (route) {

            var current = route === $location.path();
            //console.log(123);
            //console.log(route, $location.path(), current);
            return current;
        };
    }])
    .controller('View1Ctrl', ['$scope', function($scope) {
        //console.log(123);
    }])
    .controller('View2Ctrl', ['$scope', function($scope) {

    }]);

'use strict';

/* App Services */
/* http://docs.angularjs.org/#!angular.service */

angular.module('myApp.services', [])
    .factory('Phone', function($resource){
        return $resource('phones/:id.json', {}, {
            query: {method:'GET', params:{id:'phones'}, isArray:true}
        });
    });

'use strict';

/* App Directives */
/* http://docs-next.angularjs.org/api/angular.module.ng.$compileProvider.directive */

angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            //elm.text(version);
        };
    }]);

'use strict';

/* App Filters */
/* http://docs.angularjs.org/#!angular.filter */

angular.module('myApp.filters', [])
    .filter('checkmark', function() {
        return function(input) {
            return input ? '\u2713' : '\u2718';
        };
    });
