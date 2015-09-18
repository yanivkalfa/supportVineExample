'use strict';

/**
 * Format date to to D-MMM h:mma
 */
(function(ng) {
  ng.module('supportVine')
    .filter('moment', function() {
      return function(date) {
        return window.moment(date).format('D-MMM h:mma');
      };
    });
})(angular);