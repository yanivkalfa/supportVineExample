'use strict';

/**
 * Login Controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('LoginCtrl', [
      '$scope', '$state', '$stateParams', '$auth', '$location', 'TeamMemberService', '$window', '$http',
      function($scope, $state, $stateParams, $auth, $location, TeamMemberService, $window, $http) {

        // binding user model to scope and reset alerts array
        $scope.loginuser = {};
        $scope.alerts = [];

        // if we are in reset password page push error
        if ($stateParams.isRps) {
          $scope.alerts.push({
            type: 'success',
            msg: 'Your password has been updated. Please sign in.'
          });
        }

        /**
         * Login user with the details we got.
         */
        $scope.loginUser = function() {
          $scope.alerts = [];
          $auth.login({
            username: $scope.loginuser.emailAddress,
            password: $scope.loginuser.password
          }).then(function() {
          }, function() {
            $scope.alerts.push({
              type: 'danger',
              msg: 'Your email or password seems to be wrong.'
            });
          });
        };

        /**
         * clear alert
         *
         * @param index
         */
        $scope.closeAlert = function(index) {
          $scope.alerts.splice(index, 1);
        };
      }
    ]);
})(angular);

