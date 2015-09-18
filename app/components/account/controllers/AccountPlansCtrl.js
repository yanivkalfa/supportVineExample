'use strict';

/**
 * Account Plans Controller.
 */
(function(ng) {
  ng.module('supportVine')
    .controller('AccountPlansCtrl', [
      '$rootScope', '$scope', '$stateParams', '$state', 'CaseService', 'TeamMemberService',
      function($rootScope, $scope, $stateParams, $state, CaseService, TeamMemberService) {
        var init;
        /**
         * initialize scope variables
         */
        init = function() {
          $scope.displayUpgradeConfirm = false;
          $scope.billingPlans = [
            {
              name: 'Starter',
              desc: 'Up to 5 Agents Email support, 24x5 Unlimited tickets & emails',
              price: 49
            }, {
              name: 'Small Business',
              desc: 'Up to 10 Agents Email support, 24x5 Unlimited tickets & emails',
              price: 99
            }, {
              name: 'Medium Business',
              desc: 'Up to 25 Agents Email Support, 24x5 Unlimited tickets & emails',
              price: 199
            }
          ];
        };

        /**
         * Set displayUpgradeConfirm to true to show upgrade confirmation window.
         */
        $scope.displayUpgradeConfirmSection = function() {
          $scope.displayUpgradeConfirm = true;
        };

        // initializing 
        init();
      }
    ])

})(angular);