'use strict';

/**
 * Team States
 */
(function(ng){
  ng.module('supportVine')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('landing.team', {
          url: '/team',
          templateUrl: 'components/team/views/TeamView.html',
          controller: 'TeamCtrl'
        })
        .state('landing.team.members', {
          url: '/members',
          templateUrl: 'components/team/views/TeamMembersView.html',
          controller: 'TeamMembersCtrl',
          resolve: {
            channelAndMembers: ['UserService', function(UserService) {
              return UserService.init().catch(function(err){
                console.log('error:', err);
              });
            }]
          }
        })
        .state('landing.team.channels', {
          url: '/channels',
          templateUrl: 'components/team/views/TeamChannelsView.html',
          controller: 'TeamChannelsCtrl',
          resolve: {
            channelAndMembers: ['UserService', function(UserService) {
              return UserService.init().catch(function(){
                console.log('error:', err);
              });
            }]
          }
        })
    }]);
})(angular);
