'use strict';

/**
 * Crop body filter
 * Filter will check if string is longer then 75 char and cut it and add 3 dots in-case its bigger.
 */
(function(ng) {
  ng.module('supportVine')
    .filter('cropBody', function() {
      return function(str) {
        if (str && str.length > 75) {
          return str.substring(0, 75) + '...';
        } else {
          return str;
        }
      };
    });

})(angular);