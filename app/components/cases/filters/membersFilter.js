'use strict';

/**
 * Member Filter
 * Check if case has all the assigned selected members
 */
(function(ng) {
  ng.module('supportVine')
    .filter('memberFilter', ['$filter', function($filter) {
      return function(cases, teamMembers) {
        var filter = $filter('filter');
        return filter(cases, function(caze){
          if(!teamMembers.length) return true;
          var i, l;
          i = 0;
          l = caze.assignedUsers.length;
          for(i; i<l; i++){
            if(teamMembers.indexOf(caze.assignedUsers[i].key) > -1) return true;
          }
          return false;
        });
      };
    }])
})(angular);