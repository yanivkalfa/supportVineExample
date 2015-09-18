'use strict';

/**
 * Enum holds caseTypes and caseStatus
 */
(function(ng){

  ng.module('supportVine')
    .constant('ENUM', {
      caseTypes: {
        Testimonial: 'c5ef7fab-e85f-4bf5-b3db-68c52a028282',
        Enhancement: 'c5ef7fab-e85f-4bf5-b3db-68c52a028281',
        Bug: 'c5ef7fab-e85f-4bf5-b3db-68c52a028280',
        Question: 'c5ef7fab-e85f-4bf5-b3db-68c52a028283'
      },
      caseStatus : {
        OPEN : {value : 'OPEN', label : 'Open'},
        ARCHIVED : {value : 'ARCHIVED', label : 'Archive'},
        WAITING : {value : 'WAITING', label : 'Waiting'}
      }
    });
})(angular);