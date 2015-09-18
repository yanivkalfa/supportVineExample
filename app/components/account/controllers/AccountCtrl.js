'use strict';

/**
 * Account controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('AccountCtrl', [
      '$scope', 'SvMainNavTabsService',
      function($scope, SvMainNavTabsService) {

        // bind nav tab service's getActiveTabName to scope.
        $scope.getActiveTabName = SvMainNavTabsService.getActiveTabName;
      }
    ])

})(angular);