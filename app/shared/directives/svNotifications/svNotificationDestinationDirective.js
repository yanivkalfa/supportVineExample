'use strict';

/**
 * Specific directive for destination notification.
 */
(function(ng) {
  ng.module('supportVine')
    .directive('svNotificationDestination', [
      function() {
        var self;
        self = {
          restrict: 'E',
          templateUrl: 'shared/directives/svNotifications/views/partials/sv-notification-destination.html',
          scope: {
            destination: '='
          }
        };
        return self;
      }
    ]);
})(angular);