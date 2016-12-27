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

'use strict';

/* App Controllers */

angular.module('myApp.controllers', [])
    .controller('MainCtrl', function() {

    })
    .controller('NavCtrl', ['$location', 'Nav', function($location, Nav) {
        var nav = this;
        var categories = ['/videos/all'];

        nav.menus = Nav.query(function(data) {
            for (var i = 0; i < data.length; i++) {
                categories.push('/videos/' + data[i].id);
            }
        });
        nav.category = function(path) {
            return path === $location.path();
        };
        nav.crumb = function() {
            var path = $location.path();

            for (var i = 0; i < categories.length; i++) {
                if (path === categories[i]) {
                    return false;
                }
            }
            return true;
        };
    }])
    .controller('ListCtrl', ['$scope', '$routeParams', 'Videos', 'Source', function($scope, $routeParams, Videos, Source) {
        $scope.videos = Videos.query({navId: $routeParams.navId}, function(videos) {
        	angular.forEach(videos, function(item) {
	            Source.get({id: item.sourceId}, function(source) {
	            	item.sourceName = source.name;
	            	item.sourceImgUrl = source.imageUrl;
	            });
        	});
        });
    }])
    .controller('DetailCtrl', ['$scope', '$routeParams', 'Video', 'Source', function($scope, $routeParams, Video, Source) {
        $scope.video = Video.get({navId: $routeParams.navId, id: $routeParams.videoId}, function(video) {
            Source.get({id: video.sourceId}, function(source) {
            	video.sourceName = source.name;
            	video.sourceImgUrl = source.imageUrl;
            });
        });
    }]);

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
