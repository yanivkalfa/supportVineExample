'use strict';


/**
 * check if array is empty
 */
(function(ng) {
  ng.module('supportVine')
    .filter('isEmpty', function() {
      return function(obj) {
        if (ng.isArray(obj)) {
        return (obj.length === 0);
        }
      };
    })
})(angular);