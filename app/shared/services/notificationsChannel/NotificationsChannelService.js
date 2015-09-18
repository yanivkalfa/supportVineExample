'use strict';

/**
 * Channel notification service
 * Broadcase and subscribe to certain events
 *
 */
(function(ng) {
  ng.module('supportVine')
    .factory('NotificationsChannelService', [
      '$rootScope',
      function($rootScope) {

        var MESSAGE_TYPES, markAsRead, notify, onMarkAsRead, onNotification, self;
        MESSAGE_TYPES = {
          NOTIFICATION_MESSAGE: 'nc:notificationMessage',
          MARK_AS_READ_MESSAGE: 'nc:markAsReadMessage'
        };

        /**
         * broadcast message to event subscribers
         *
         * @param {*} notification
         * @returns {*|Object}
         */
        notify = function(notification) {
          return $rootScope.$broadcast(MESSAGE_TYPES.NOTIFICATION_MESSAGE, notification);
        };

        /**
         * Subscribe to a certain event
         *
         * @param {Object} $scope
         * @param {Function} handler
         * @returns {*|function()}
         */
        onNotification = function($scope, handler) {
          return $scope.$on(MESSAGE_TYPES.NOTIFICATION_MESSAGE, function(event, message) {
            return handler(message);
          });
        };

        /**
         * broadcast mark as read with the certain notification for all subscribers
         *
         * @param {Object} notification
         * @returns {*|Object}
         */
        markAsRead = function(notification) {
          return $rootScope.$broadcast(MESSAGE_TYPES.MARK_AS_READ_MESSAGE, notification);
        };

        /**
         * Subscribe to mark as read
         *
         * @param {Object} $scope
         * @param {Function} handler
         * @returns {*|function()}
         */
        onMarkAsRead = function($scope, handler) {
          return $scope.$on(MESSAGE_TYPES.MARK_AS_READ_MESSAGE, function(event, message) {
            return handler(message);
          });
        };

        // expose the method we want to expose.
        self = {
          MESSAGE_TYPES: MESSAGE_TYPES,
          notify: notify,
          markAsRead: markAsRead,
          onNotification: onNotification,
          onMarkAsRead: onMarkAsRead
        };
        return self;
      }
    ]);

})(angular);