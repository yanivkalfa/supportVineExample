'use strict';

/**
 * crop body filter.
 */
(function(ng) {
  ng.module('supportVine')
    .filter('cropBody', function() {
      return function(str) {
        // if body length is bigger then 75 letters we chop it and add 3 dots. (works like excerpt)
        return (str && str.length > 75) ? str.substring(0, 75) + '...' : str;
      };
    });

})(angular);