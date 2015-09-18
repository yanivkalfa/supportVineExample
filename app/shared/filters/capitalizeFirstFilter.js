'use strict';

/**
 * Capitalizes first latter of a string.
 */
(function(ng) {
  ng.module('supportVine')
    .filter('capitalizeFirst',['SvUtilsService', function(SvUtilsService) {
      return function(aString) {
        if(!aString) return aString;
        return SvUtilsService.capitalize(aString.toLowerCase());
      };
    }] )
})(angular);