'use strict';

/**
 * Register Service - RESTfull api.(ng resource)
 */
(function(ng) {
  ng.module('supportVine')
    .factory('RegisterService', [
      '$resource', 'ENV',
      function($resource, ENV) {
        var registerServiceUrl, forgotpasswordUrl, resetpasswordUrl;

        registerServiceUrl = ENV.serverUrl + '/supportvine/aggregators/register';
        forgotpasswordUrl = ENV.serverUrl + '/supportvine/aggregators/forgotpassword';
        resetpasswordUrl = ENV.serverUrl + '/supportvine/aggregators/resetpassword';

        return $resource(registerServiceUrl, {}, {
          signup: {
            method: 'POST',
            url: registerServiceUrl
          },
          forgotpassword: {
            method: 'POST',
            url: forgotpasswordUrl,
            isArray:false
          },
          resetpassword: {
            method: 'POST',
            url: resetpasswordUrl
          }
        });
      }
    ]);

})(angular);