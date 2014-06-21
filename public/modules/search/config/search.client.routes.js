/**
 * Created by wesley on 6/21/14.
 */
'use strict';

// Setting up route
angular.module('search').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        // Home state routing
        $stateProvider.
            state('search', {
                url: '/search',
                templateUrl: 'modules/search/views/search.client.view.html'
            });
    }
]);