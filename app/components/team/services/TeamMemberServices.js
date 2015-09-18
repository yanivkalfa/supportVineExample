'use strict';

/**
 * Team Member - use ng - resource - restful
 */
(function(ng) {
  ng.module('supportVine')
    .factory('TeamMemberService', [
      '$resource', 'PinnedCasesChannelService', 'ENV',
      function($resource, PinnedCasesChannelService, ENV) {
        var teamMemberAuthenticatedServicesUrl, teamMemberCrudServicesUrl, teamMemberDeleteMember, teamMemberNotificationsUrl, teamMemberPinCaseServicesUrl, teamMemberPinnedCasesServicesUrl, teamMemberPokeUrl, teamMemberSendInvitation, teamMemberServicesUrl;
        teamMemberServicesUrl = '' + ENV.serverUrl + '/supportvine/aggregators/teams/:id/members';
        teamMemberCrudServicesUrl = '' + ENV.serverUrl + '/supportvine/aggregators/teams/members/:memberId';
        teamMemberSendInvitation = '' + ENV.serverUrl + '/supportvine/aggregators/teams/members/:memberId/reinvite';
        teamMemberDeleteMember = '' + ENV.serverUrl + '/supportvine/aggregators/teams/members/:key';
        teamMemberPinnedCasesServicesUrl = '' + ENV.serverUrl + '/supportvine/aggregators/cases/pinned/member/:memberId';
        teamMemberPinCaseServicesUrl = '' + ENV.serverUrl + '/supportvine/aggregators/cases/:id/pin/member/:memberId';
        teamMemberAuthenticatedServicesUrl = '' + ENV.serverUrl + '/supportvine/aggregators/teams/member';
        teamMemberNotificationsUrl = '' + ENV.serverUrl + '/supportvine/aggregators/teams/members/:memberId/notifications';
        teamMemberPokeUrl = '' + ENV.serverUrl + '/supportvine/aggregators/teams/members/:memberId/poke';

        return $resource(teamMemberServicesUrl, {
          id: '@Id',
          memberId: '@memberId'
        }, {
          add: {
            url: teamMemberCrudServicesUrl,
            method: 'POST'
          },
          sendInvitation: {
            url: teamMemberSendInvitation,
            method: 'POST'
          },
          deleteMember: {
            url: teamMemberDeleteMember,
            method: 'DELETE'
          },
          update: {
            url: teamMemberCrudServicesUrl,
            method: 'PUT'
          },
          getNotifications: {
            url: teamMemberNotificationsUrl,
            method: 'GET',
            isArray: true
          },
          getPinnedCases: {
            url: teamMemberPinnedCasesServicesUrl,
            method: 'GET',
            isArray: true
          },
          addPinnedCase: {
            url: teamMemberPinCaseServicesUrl,
            method: 'PUT',
            interceptor: {
              response: function(data) {
                if (data.status === 200) {
                  PinnedCasesChannelService.pinCase(data.data.pin);
                }
              }
            }
          },
          removePinnedCase: {
            url: teamMemberPinCaseServicesUrl,
            method: 'DELETE',
            interceptor: {
              response: function(data) {
                if (data.status === 200) {
                  PinnedCasesChannelService.unpinCase(data.data.pin);
                }
              }
            }
          },
          clearPinnedCases: {
            url: teamMemberPinnedCasesServicesUrl,
            method: 'DELETE',
            interceptor: {
              response: function(data) {
                if (data.status === 200) {
                  PinnedCasesChannelService.clearPinnedCases();
                }
              }
            }
          },
          getAuthenticatedMember: {
            url:teamMemberAuthenticatedServicesUrl,
            method: 'GET'
          }
        });
      }
    ]);

})(angular);