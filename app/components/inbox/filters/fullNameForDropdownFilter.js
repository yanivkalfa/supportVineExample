'use strict';

/**
 * Full name for dropdown menus
 */
(function(ng) {
  ng.module('supportVine')
    .filter('fullNameForDropdown', function() {
      return function(member) {
        var name;
        if (!member) {
          return 'Unassigned';
        }
        name = "";
        name += (member.firstName ? member.firstName : "");
        name += (name ? ' ' : "");
        name += (member.lastName ? member.lastName : "");
        return name;
      };
    });

})(angular);