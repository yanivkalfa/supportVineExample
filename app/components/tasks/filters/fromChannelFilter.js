'use strict';

/**
 * From channel filter
 */
(function(ng) {
  ng.module('supportVine')
    .filter('fromChannel', ['$parse', function($parse) {
      return function(collection, itemToCheck, path) {
        return _.filter(collection, function(item) {
          if(_.isEmpty(itemToCheck)){
            return true;
          }

          var channelKey;
          if(path){
            var displayGetter = $parse(path);
            channelKey = displayGetter(item);
          }

          return channelKey === itemToCheck;
        });
      };
    }]);
})(angular);