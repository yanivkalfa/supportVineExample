'use strict';

/**
 * Just error page - not used yet
 */
(function(ng) {
  ng.module('supportVine')
    .controller('ErrorPageCtrl', ['$scope', '$stateParams', 'ERRORLIST',
      function($scope, $stateParams, ERRORLIST){

        // assign error type from error list to scope
        $scope.error = ERRORLIST[$stateParams.err];
      }
    ]);
})(angular);
