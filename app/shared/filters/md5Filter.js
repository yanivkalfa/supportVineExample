'use strict';

/**
 * encrypt string to md5
 */
(function(ng) {
  ng.module('supportVine')
    .filter('md5', function() {
      return function(str) {
        if (!str) {
          return null;
        } else {
          return window.CryptoJS.MD5(str).toString();
        }
      };
    })
})(angular);