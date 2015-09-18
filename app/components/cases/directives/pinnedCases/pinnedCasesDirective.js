'use strict';

/**
 * Pinned case directive
 *
 */
(function(ng) {
  ng.module('supportVine')
    .directive('pinnedCases', [
      '$document', '$timeout', 'UserService', 'CaseTabsService', 'PinnedCasesChannelService',
      function($document, $timeout, UserService, CaseTabsService, PinnedCasesChannelService) {
        return {
          restrict: 'EA',
          templateUrl: 'components/cases/directives/pinnedCases/views/pinnedCasesView.html',
          scope: {},
          link: function(scope, elem) {
            // bind variables to scope
            scope.user = UserService.getUser();
            scope.addTab = _.bind(CaseTabsService.add,CaseTabsService);
            scope.clearPinnedCases = _.bind(UserService.clearPinnedCases,UserService);
            scope.unpinCase = _.bind(UserService.unpinCase,UserService);

            // setting several pub sub methods.
            PinnedCasesChannelService.onPinCase(scope, _.bind(UserService.onPinCase,UserService));
            PinnedCasesChannelService.onUnpinCase(scope, _.bind(UserService.onUnpinCase,UserService));
            PinnedCasesChannelService.onClearPinnedCases(scope, _.bind(UserService.getUserPinnedCases,UserService));
          }
        };
      }
    ]);
})(angular);