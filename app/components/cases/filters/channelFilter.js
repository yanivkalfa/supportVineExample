'use strict';

/**
 * Channel filter
 * Filter cases check the case is assigned to a certain channel
 */
(function(ng) {
  ng.module('supportVine')
    .filter('channelFilter', ['$filter', function($filter) {
      return function(cases, channelKey) {
        var filter = $filter('filter');
        return filter(cases, function(caze){
          if (channelKey === "") return true;
          return caze.channelKey === channelKey;
        });
      };
    }])
})(angular);