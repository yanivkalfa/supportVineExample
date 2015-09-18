'use strict';

/**
 * REST Case resource service.
 */
(function(ng) {
  ng.module('supportVine')
    .factory('CaseService', [
      '$resource', 'ENV',
      function($resource, ENV) {
        var caseDetailServicesUrl, caseServicesUrl, caseServicesUrlForConversation, caseServicesUrlForMessage, caseServicesUrlForStatements, caseServicesUrlForTasks, pokeCaseUrl;
        caseDetailServicesUrl = '' + ENV.serverUrl + '/supportvine/aggregators/cases/:key';
        caseServicesUrl = '' + ENV.serverUrl + '/supportvine/aggregators/cases/member/:userKey';
        caseServicesUrlForMessage = '' + ENV.serverUrl + '/supportvine/aggregators/cases/related/:messageKey';
        caseServicesUrlForConversation = '' + ENV.serverUrl + '/supportvine/aggregators/cases/:key/conversation';
        caseServicesUrlForTasks = '' + ENV.serverUrl + '/supportvine/aggregators/cases/:key/tasks';
        caseServicesUrlForStatements = '' + ENV.serverUrl + '/supportvine/aggregators/cases/:key/statement';
        pokeCaseUrl = '' + ENV.serverUrl + '/supportvine/aggregators/cases/:key/poke';
        return $resource(caseServicesUrl, {
          key: '@key',
          userKey: '@userKey',
          messageKey: '@messageKey'
        }, {
          queryMessageRelated: {
            method: 'GET',
            url: caseServicesUrlForMessage,
            isArray: true
          },
          poke: {
            method: 'POST',
            url: pokeCaseUrl,
            isArray: true
          },
          queryArchived: {
            method: 'GET',
            url: caseServicesUrl,
            isArray: true
          },
          get: {
            method: 'GET',
            url: caseDetailServicesUrl
          },
          create: {
            method: 'POST',
            url: caseDetailServicesUrl
          },
          update: {
            method: 'PUT',
            url: caseDetailServicesUrl
          },
          queryConversation: {
            method: 'GET',
            url: caseServicesUrlForConversation
          },
          queryTasks: {
            method: 'GET',
            url: caseServicesUrlForTasks,
            isArray: true
          },
          createStatement: {
            method: 'POST',
            url: caseServicesUrlForStatements
          }
        });
      }
    ]);

  /**
   * REST CaseTypeahead resource service.
   */
  ng.module('supportVine')
    .service('CaseTypeahead', ['$http', 'ENV', function($http, ENV) {
      var caseServicesUrl;
      caseServicesUrl = '' + ENV.serverUrl + '/supportvine/aggregators/cases/member/:userKey';
      return {
        getCases: function(userKey) {
          return $http.get(caseServicesUrl.replace(':userKey', userKey), {
            params: {}
          });
        }
      };
    }]);

})(angular);