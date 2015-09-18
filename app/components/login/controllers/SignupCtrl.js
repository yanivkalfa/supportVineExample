(function(ng) {
  'use strict';

  /**
   * Sign up controller
   */
  ng.module('supportVine')
    .controller('SignupCtrl', [
      '$rootScope', '$scope', '$stateParams', '$state', 'RegisterService', '$auth',
      function( $rootScope, $scope, $stateParams, $state, RegisterService, $auth ) {

        // bind variables to scope.
        $scope.newuser = {
          planId: '9502e792-d2c5-4551-bd40-8d1b31d5fb5e'
        };
        $scope.newCard = {};
        $scope.validationErrors = {};

        /**
         * sign user up uses save credit card.
         */
        $scope.signupUser = function() {
          $scope.saveCreditCard();
        };

        /**
         * noop
         */
        $scope.formChanged = function() {};

        /**
         * Saves credit card info and user details.
         */
        $scope.saveCreditCard = function() {

          /**
           * Uses Stripe to create new user - doesnt work currently.
           */
          Stripe.card.createToken($scope.newCard, function(status, response) {
            var token;
            if (response.error) {
              console.log(response.error);
            } else {
              token = response['id'];
              console.log('token', token);
              $scope.newuser.stripeCardToken = token;
              $auth.signup($scope.newuser);
            }
          });
        };
      }
    ]);

})(angular);