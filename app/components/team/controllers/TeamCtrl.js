'use strict';

/**
 * Team Controller.
 */
(function(ng) {
  ng.module('supportVine')
    .controller('TeamCtrl', [
      '$scope', 'SvMainNavTabsService',
      function($scope, SvMainNavTabsService) {
        // bind getActiveTabName to scope.
        $scope.getActiveTabName = SvMainNavTabsService.getActiveTabName;
      }
    ])

})(angular);