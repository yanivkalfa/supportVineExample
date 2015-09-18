'use strict';

/**
 * Messages services
 * REST ngResource service
 */
(function(ng) {
  ng.module('supportVine')
    .factory('MessageServices', [
      '$resource', 'ENV',
      function($resource, ENV) {
        var messageServiceForCaseUrl, messageServiceUrl, messagesServiceUrl, messagesServiceForMemberUrl;
        messagesServiceUrl = '' + ENV.serverUrl + '/supportvine/aggregators/messages/team/:userTeamKey?page=:page';
        messagesServiceForMemberUrl = '' + ENV.serverUrl + '/supportvine/aggregators/messages/member/:userKey';
        messageServiceUrl = '' + ENV.serverUrl + '/supportvine/aggregators/messages/:key';
        messageServiceForCaseUrl = '' + ENV.serverUrl + '/supportvine/aggregators/messages/case/:caseKey';
        return $resource(messageServiceUrl, {
          key: '@key',
          caseKey: '@caseKey'
        }, {
          query: {
            method: 'GET',
            url: messagesServiceUrl,
            isArray: true
          },
          filterForMember: {
            method: 'GET',
            url: messagesServiceForMemberUrl,
            isArray: true
          },
          process: {
            method: 'PUT',
            url: messageServiceUrl + '/process'
          },
          archive: {
            method: 'PUT',
            url: messageServiceUrl + '/archive'
          },
          queryForCase: {
            method: 'GET',
            url: messageServiceForCaseUrl,
            isArray: true
          }
        });
      }
    ]);

})(angular);