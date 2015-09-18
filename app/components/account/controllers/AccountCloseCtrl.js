'use strict';

/**
 * Account Close Controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('AccountCloseCtrl', [
      '$rootScope', '$scope', '$stateParams', '$state', 'CaseService', 'TeamMemberService',
      function($rootScope, $scope, $stateParams, $state, CaseService, TeamMemberService) {
        var init;

        /**
         * initializing scope variables.
         */
        init = function() {
          $scope.displayCloseConfirm = false;
        };

        /**
         * Set displayCloseConfirm to true showing the close account dialogue.
         */
        $scope.openCloseConfirmBox = function() {
          $scope.displayCloseConfirm = true;
        };
        init();
      }
    ])

})(angular);