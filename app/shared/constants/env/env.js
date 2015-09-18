'use strict';

/**
 * Holds environment details.
 */
(function(ng){

  ng.module('supportVine')
    .constant('ENV', (function(){
      // dev sever address
      var serverUrl = 'http://dev.supportvine.net/api';

      return {
        env : 'dev',
        serverUrl : serverUrl,
        // authentication config
        authProvider : {
          loginUrl : serverUrl + '/supportvine/oauth/token?grant_type=password',
          loginRedirect : '/',
          tokenName : 'access_token',
          signupUrl : serverUrl + '/supportvine/aggregators/register',
          loginOnSignup : false
        }
      };
    })())
})(angular);