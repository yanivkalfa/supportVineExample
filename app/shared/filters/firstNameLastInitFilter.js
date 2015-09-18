'use strict';

/**
 * Takes member object and compose a clean name of First name and last name init.
 */
(function(ng) {
  ng.module('supportVine')
    .filter('firstNameLastInit', function() {
      return function(member) {
        var name;
        if (!member) {
          return 'Unassigned';
        }
        name = "";
        name += (member.firstName ? member.firstName : "");
        name += (name ? ' ' : "");
        name += (member.lastName ? member.lastName.substring(0, 1) + '.' : "");
        return name;
      };
    })
})(angular);