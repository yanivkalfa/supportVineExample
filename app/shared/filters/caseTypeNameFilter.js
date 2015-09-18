'use strict';

/**
 * Get the case type name by case type key
 */
(function(ng) {
  ng.module('supportVine')
    .filter('caseTypeName', ['ENUM', function(ENUM) {
      return function(pcaseType) {
        var caseType;
        if (!pcaseType) {
          return "";
        }
        for (caseType in ENUM.caseTypes) {
          if (ENUM.caseTypes[caseType] === pcaseType) {
            return caseType;
          }
        }
        return "";
      };
    }])
})(angular);