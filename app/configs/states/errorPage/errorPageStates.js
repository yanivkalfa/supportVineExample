'use strict';

/**
 * ErrorPage State
 */
(function(ng){
  ng.module('supportVine')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('errorPage', {
          url: '/errorPage/:err',
          templateUrl: 'components/errorPage/views/ErrorPageView.html',
          controller: 'ErrorPageCtrl'
        });
    }]);
})(angular);
