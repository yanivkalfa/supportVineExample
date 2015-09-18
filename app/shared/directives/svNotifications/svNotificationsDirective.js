'use strict';

/**
 * This is notification directive handle what to do with notification
 */
(function(ng) {
  ng.module('supportVine')
    .directive('svNotifications', [
      '$document', '$timeout', 'NotificationsChannelService', 'NotificationService',
      function($document, $timeout, NotificationsChannelService, NotificationService) {
        return {
          restrict: 'EA',
          templateUrl: 'shared/directives/svNotifications/views/svNotificationsView.html',
          scope:{},
          link: function(scope, elem) {
            var timeout;
            timeout = false;
            scope.notifications = [];
            scope.showNotifications = false;
            scope.toggleNotifications = function() {
              return scope.showNotifications = !scope.showNotifications;
            };
            scope.markNotificationRead = function() {
              if (timeout) {
                $timeout.cancel(timeout);
              }
              return timeout = $timeout(function() {
                return scope.notifications.filter(function(notification) {
                  return !notification.seen;
                }).forEach(function(notification) {
                  notification.seen = true;
                  return NotificationService.markAsRead(notification);
                });
              }, 2600);
            };
            NotificationsChannelService.onNotification(scope, function(notification) {
              return scope.notifications.push(notification);
            });
            return $document.bind('click', function(event) {
              var isClickedElementChildOfPopup;
              isClickedElementChildOfPopup = elem.find(event.target).length > 0;
              if (isClickedElementChildOfPopup) {
                return true;
              }
              scope.showNotifications = false;
              scope.$digest();
              return true;
            });
          }
        };
      }
    ]);

})(angular);