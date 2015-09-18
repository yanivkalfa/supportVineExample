'use strict';

/**
 * Hold error lists
 */
(function(ng){
  ng.module('supportVine')
    .constant('ERRORLIST', {
      "100001" : {name:'API_ERROR', message:'Ops it seems we are having technical difficulties!'}
    })
})(angular);
