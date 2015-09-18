'use strict';

/**
 * Takes member object and compose a clean name of First name and last name.
 */
(function(ng) {
  ng.module('supportVine')
    .filter('fullName', function() {
      return function(member) {
        var name;
        if (!member) {
          return "";
        }
        name = "";
        name += (member.firstName ? member.firstName : "");
        name += (name ? ' ' : "");
        name += (member.lastName ? member.lastName : "");
        return name;
      };
    })
})(angular);