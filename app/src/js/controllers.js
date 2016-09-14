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
