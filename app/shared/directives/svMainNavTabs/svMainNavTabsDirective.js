'use strict';

/**
 * Directive that handles the main tabs on the left
 *
 * TODO: set the even to add/remove msgCount
 */
(function(ng) {
  ng.module('supportVine')
    .directive('svMainNavTabs', [
      '$rootScope', 'UserService', 'SvMainNavTabsService',
      function($rootScope, UserService, SvMainNavTabsService) {
        return {
          restrict: 'EA',
          templateUrl: 'shared/directives/svMainNavTabs/views/svMainNavTabsView.html',
          scope: {},
          link: function(scope, elem) {

            // getting all current tabs from tab service
            scope.tabs = SvMainNavTabsService.get();

            // setting access control
            scope.userCanAccess = _.bind(UserService.userCanAccess,UserService);

            // on stateChange we select the current tab
            $rootScope.$on('$stateChangeSuccess', function() {
              SvMainNavTabsService.selectTab();
            });

            SvMainNavTabsService.selectTab();

            scope.$on('event:inboxChanged', function(e, args) {
              SvMainNavTabsService.setMsgCount('inbox',args);
            });

            scope.$on('event:tasksChanged', function(e, args) {
              SvMainNavTabsService.setMsgCount('tasks',args);
            });

            scope.$on('event:casesChanged', function(e, args) {
              SvMainNavTabsService.setMsgCount('cases',args);
            });

            scope.$on('event:archiveChanged', function(e, args) {
              SvMainNavTabsService.setMsgCount('archive',args);
            });
          }
        };
      }
    ]);

})(angular);