'use strict';

/**
 * check if used active or inactive and return the
 * Visually good looking name.
 */
(function(ng) {
  ng.module('supportVine')
    .filter('formatActive', function() {
      return function(isActive) {
        if (isActive) {
          return 'Active';
        } else {
          return 'Inactive';
        }
      };
    })
})(angular);