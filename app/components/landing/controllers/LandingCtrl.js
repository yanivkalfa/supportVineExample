'use strict';

/**
 * Landing controller.
 */
(function(ng) {
  ng.module('supportVine')
    .controller('LandingCtrl', [
      '$rootScope', '$scope', 'UserService', 'SvLiveApiService', 'SvMainNavTabsService',
      function($rootScope, $scope, UserService, SvLiveApiService, SvMainNavTabsService) {

        // function to get active tab.
        $scope.getActiveTab = _.bind(SvMainNavTabsService.getActive,SvMainNavTabsService);

        $scope.showChannelFilter = function(){
          var active, rootActive;
          active = $scope.getActiveTab();
          rootActive = SvMainNavTabsService.getRootTab(active);
          return active !== 'caseDetails' && rootActive !== 'account' && rootActive !== 'team';
        };

        $scope.showSearch = function(){
          var active, rootActive;
          active = $scope.getActiveTab();
          rootActive = SvMainNavTabsService.getRootTab(active);
          return rootActive !== 'account' && rootActive !== 'team';
        };

        // starting notifications
        SvLiveApiService.start().then(function() {
          return SvLiveApiService.addMemberToNotificationsChannel($scope.user.key);
        }).then(function() {
          UserService.getUserNotifications();
        });
      }
    ]);
})(angular);