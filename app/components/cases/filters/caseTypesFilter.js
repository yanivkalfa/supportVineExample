'use strict';

/**
 * Case types filter
 * Filter cases checks case has all the selected types
 */
(function(ng) {
  ng.module('supportVine')
    .filter('caseTypesFilter', ['$filter', function($filter) {
      return function(cases, caseTypesKeys) {
        var filter = $filter('filter');
        return filter(cases, function(caze){
          if(!caseTypesKeys.length) return true;
          var i, l, matches ;
          i = 0;
          matches = 0;
          l = caze.caseTypesKeys.length;
          for(i;i<l;i++){
            if(caseTypesKeys.indexOf(caze.caseTypesKeys[i]) > -1){
              matches++;
            }
          }
          return matches === caseTypesKeys.length;
        });
      };
    }])
})(angular);