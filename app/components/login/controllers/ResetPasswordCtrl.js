'use strict';

/**
 * Reset password controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('ResetPasswordCtrl', [
      '$scope', '$state', '$stateParams', 'RegisterService',
      function($scope, $state, $stateParams, RegisterService) {

        // setting user model
        $scope.user = {
          password: "",
          passwordconfirm: "",
          token: $stateParams.sptoken
        };

        // setting alert array.
        $scope.alerts = [];

        /**
         * Confirm password reset
         */
        $scope.confirmPasswordReset = function() {
          $scope.alerts = [];
          if ($scope.user.password !== $scope.user.passwordconfirm) {
            $scope.alerts.push({
              type: 'danger',
              msg: 'Password doesn\'t match the confirmation.'
            });
            return;
          }

          delete $scope.user.passwordconfirm;

          // reset password on server
          RegisterService.resetpassword($scope.user, (function(result) {
            $state.go('login', { isRps: 'true' });
          }), function(result) {
            $scope.alerts.push({
              type: 'danger',
              msg: 'Couldn\'t recover your Password.'
            });
          });
        };

        // remove last alert
        $scope.closeAlert = function(index) {
          $scope.alerts.splice(index, 1);
        };
      }
    ]);

})(angular);