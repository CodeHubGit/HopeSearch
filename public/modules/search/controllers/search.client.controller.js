'use strict';

/**
 * Created by wesley on 6/21/14.
 */
angular.module('search').controller('SearchController', ['$scope', '$http',
    function($scope, $http) {
        $scope.search = {};

        $scope.search.leftEye = {};
        $scope.search.rightEye = {};

        $scope.matchingGlasses = [];

        $scope.searchPrescription = function (search) {
            $scope.matchingGlasses.push('yoyoswag');
        };
    }]);