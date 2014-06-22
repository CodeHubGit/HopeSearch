'use strict';

/**
 * Created by wesley on 6/21/14.
 */
angular.module('search').controller('SearchController', ['$scope', '$http', 'Glasses',
    function($scope, $http, Glasses) {
        $scope.search = {};

        $scope.search.leftEye = {};
        $scope.search.rightEye = {};

        $scope.matchingGlasses = [];

        $scope.searchPrescription = function (search) {
            $scope.matchingGlasses.push('yoyoswag');
        };

        $scope.find = function() {
            $scope.articles = Glasses.query();
        };
    }]);