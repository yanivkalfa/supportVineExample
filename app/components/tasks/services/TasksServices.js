'use strict';

/**
 * Team task service - use ng - resource - restful
 */
(function(ng) {
  ng.module('supportVine')
    .factory('TaskServices', [
      '$resource', 'ENV',
      function($resource, ENV) {
        var memberTasksServicesUrl, tasksServicesUrl;
        tasksServicesUrl = '' + ENV.serverUrl + '/supportvine/aggregators/tasks/:key';
        memberTasksServicesUrl = '' + ENV.serverUrl + '/supportvine/aggregators/tasks/member/:userKey';
        return $resource(tasksServicesUrl, {
          key: '@key',
          userKey: '@userKey'
        }, {
          update: {
            method: 'PUT'
          },
          remove: {
            method: 'DELETE'
          },
          queryByMember: {
            method: 'GET',
            url: memberTasksServicesUrl,
            isArray: true
          }
        });
      }
    ]);

})(angular);