'use strict';

/**
 * Forgot password controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('ForgotPasswordCtrl', [
      '$scope', '$state', '$stateParams', 'RegisterService',
      function($scope, $state, $stateParams, RegisterService) {

        // settings user modal and resetting alerts array
        $scope.user = { emailAddress: null };
        $scope.alerts = [];

        /**
         * reset the password
         */
        $scope.requestPasswordReset = function() {
          $scope.alerts = [];
          // reset password
          RegisterService.forgotpassword($scope.user, (function(result) {

            // push message to alert
            $scope.alerts.push({
              type: 'success',
              msg: 'We\'ve sent you instructions on how to reset your password.'
            });

          }), function(result) {

            // if error
            if(result.status = 404){
              // push message to alert
              $scope.alerts.push({
                type: 'danger',
                msg: 'We couldn\'t find this email.'
              });
            }
          });
        };

        // close alert window
        $scope.closeAlert = function(index) {
          $scope.alerts.splice(index, 1);
        };
      }
    ]);

})(angular);