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
