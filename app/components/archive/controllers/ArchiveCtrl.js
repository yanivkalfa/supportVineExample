'use strict';

/**
 * Archives Controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('ArchiveCtrl', [
      '$scope', 'SvMainNavTabsService',
      function($scope, SvMainNavTabsService) {

        // bind nav tab service's getActiveTabName to scope.
        $scope.getActiveTabName = SvMainNavTabsService.getActiveTabName;
      }
    ]);
})(angular);