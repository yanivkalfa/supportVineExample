'use strict';

/**
 * Case Tabs directive in-charge of the horizontal tabs
 */
(function(ng) {
  ng.module('supportVine')
    .directive('caseTabs', [
      'CaseTabsService', 'SvMainNavTabsService',
      function( CaseTabsService, SvMainNavTabsService) {
        return {
          restrict: 'EA',
          templateUrl: 'components/cases/directives/caseTabs/views/caseTabsView.html',
          scope: {},
          link: function(scope, elem) {

            // function to get active tab.
            scope.getActiveTab = _.bind(SvMainNavTabsService.getActive,SvMainNavTabsService);
            // setting caseTabs
            scope.caseTabs = CaseTabsService;
          }
        };
      }
    ]);

})(angular);