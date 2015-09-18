'use strict';

/**
 * Team Channel service - use ng - resource - restful
 */
(function(ng) {
  ng.module('supportVine')
    .factory('TeamChannelService', [
      '$resource', 'ENV',
      function($resource, ENV) {
        var channelsAddRemoveMemberService, channelsCrudServiceUrl, channelsGetMembersService, channelsServiceUrl;
        channelsServiceUrl = '' + ENV.serverUrl + '/supportvine/aggregators/teams/members/:userKey/channels';
        channelsCrudServiceUrl = '' + ENV.serverUrl + '/supportvine/aggregators/channels/:channelType/:id';
        channelsAddRemoveMemberService = '' + ENV.serverUrl + '/supportvine/aggregators/channels/:channelType/:id/members/:userKey';
        channelsGetMembersService = '' + ENV.serverUrl + '/supportvine/aggregators/channels/:channelType/:id/members';
        return $resource(channelsCrudServiceUrl, {
          userKey: '@userKey',
          id: '@id',
          channelType: 'email'
        }, {
          query: {
            method: 'GET',
            url: channelsServiceUrl,
            isArray: true
          },
          update: {
            method: 'PUT',
            url: channelsCrudServiceUrl
          },
          addMember: {
            method: 'PUT',
            url: channelsAddRemoveMemberService
          },
          removeMember: {
            method: 'DELETE',
            url: channelsAddRemoveMemberService
          },
          getMembers: {
            method: 'GET',
            url: channelsGetMembersService,
            isArray: true
          }
        });
      }
    ]);

})(angular);