'use strict';

/**
 * format dates to a nice looking format
 */
(function(ng) {
  ng.module('supportVine')
    .filter('friendlyTimestamp', function() {
      return function(date) {
        var diff, now;
        date = date / 1000;
        now = new Date().getTime() / 1000;
        diff = Math.round(now - date);
        if (diff < 60) {
          return Math.round(diff) + ' Second' + (Math.round(diff) > 1 ? 's' : '') + ' Ago';
        } else if (diff < 60 * 60) {
          return Math.round(diff / 60) + ' Minute' + (Math.round(diff / 60) > 1 ? 's' : '') + ' Ago';
        } else if (diff < 60 * 60 * 24) {
          return Math.round(diff / (60 * 60)) + ' Hour' + (Math.round(diff / (60 * 60)) > 1 ? 's' : '') + ' Ago';
        } else if (diff < 60 * 60 * 24 * 7) {
          return Math.round(diff / (60 * 60 * 24)) + ' Day' + (Math.round(diff / (60 * 60 * 24)) > 1 ? 's' : '') + ' Ago';
        } else if (diff < 60 * 60 * 24 * 7 * 4) {
          return Math.round(diff / (60 * 60 * 24 * 7)) + ' Week' + (Math.round(diff / (60 * 60 * 24 * 7)) > 1 ? 's' : '') + ' Ago';
        } else if (diff < 60 * 60 * 24 * 365) {
          return Math.round(diff / (60 * 60 * 24 * 30)) + ' Month' + (Math.round(diff / (60 * 60 * 24 * 30)) > 1 ? 's' : '') + ' Ago';
        } else {
          return Math.round(diff / (60 * 60 * 24 * 365)) + ' Year' + (Math.round(diff / (60 * 60 * 24 * 365)) > 1 ? 's' : '') + ' Ago';
        }
      };
    });

})(angular);