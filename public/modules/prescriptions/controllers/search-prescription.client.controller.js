'use strict';

// Prescriptions controller
angular.module('prescriptions').controller('SearchPrescriptionController', ['$scope', '$stateParams', '$location', 'Authentication', 'Prescriptions',
    function($scope, $stateParams, $location, Authentication, Prescriptions ) {
        $scope.authentication = Authentication;

        // Create new Prescription
        $scope.search = function() {
            $scope.prescriptions = Prescriptions.query();
        };

    }
]);