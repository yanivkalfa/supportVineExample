'use strict';

/*
* Notification service returns a resource that allow you to mark things
* */
(function(ng) {
  ng.module('supportVine')
    .factory('NotificationService', [
      '$resource', 'ENV', 'NotificationsChannelService',
      function($resource, ENV, NotificationsChannelService) {
        var notificationsMarkAsReadUrl, notificationsUrl;
        notificationsUrl = '' + ENV.serverUrl + '/supportvine/aggregators/notifications/:key';
        notificationsMarkAsReadUrl = '' + ENV.serverUrl + '/supportvine/aggregators/notifications/:key/mark';
        return $resource(notificationsUrl, {
          key: '@key'
        }, {
          markAsRead: {
            url: notificationsMarkAsReadUrl,
            method: 'POST',
            interceptor: {
              response: function(res) {
                NotificationsChannelService.markAsRead(res.data.data);
              }
            }
          }
        });
      }
    ]);

})(angular);