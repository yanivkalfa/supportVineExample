'use strict';
/**
 * Text filter
 * check if case description + title + number has the search string.
 */
(function(ng) {
  ng.module('supportVine')
    .filter('textFilter', ['$filter', function($filter) {
      return function(cases, keyword) {
        var filter = $filter('filter');
        return filter(cases, function(caze){
          if (!keyword) return true;
          var heystack;
          heystack = caze.description + caze.title + caze.caseNumber;
          return heystack.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
        });
      };
    }])
})(angular);