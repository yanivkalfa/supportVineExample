'use strict';

/**
 * intercept and authenticate requests.
 */
(function(ng){
  ng.module('supportVine')
    .factory('AuthInterceptorService', [
      '$q', '$injector', 'ENV',
      function ($q, $injector, ENV) {
        return {
          // optional method
          'request': function (httpConfig) {
            var $auth, tokenName;

            // if we are logging in add the following headers
            if (ENV.authProvider.loginUrl === httpConfig.url) {
              httpConfig.headers.Authorization = 'Basic MzUzYjMwMmM0NDU3NGY1NjUwNDU2ODdlNTM0ZTdkNmE6Mjg2OTI0Njk3ZTYxNWE2NzJhNjQ2YTQ5MzU0NTY0NmM=';
              httpConfig.url += '&username=' + httpConfig.data.username + '&password=' + httpConfig.data.password;
            }

            // if we are already logged in and have a token we add that.

            $auth = $injector.get('$auth');
            tokenName = $auth.getToken();
            if (tokenName) {
              httpConfig.headers.Authorization = 'Bearer ' + tokenName;
            }

            return httpConfig;
          },

          // optional method
          'requestError': function (rejection) {
            // do something on error
            //if (canRecover(rejection)) {
            //  return responseOrNewPromise
            //}
            return $q.reject(rejection);
          },


          // optional method
          'response': function (response) {
            // do something on success
            return response;
          },

          // optional method
          'responseError': function (response) {
            var $auth, $state;
            $state = $injector.get('$state');
            $auth = $injector.get('$auth');
            if (response.status === 401) {
              $auth.removeToken();
              $state.go('login');
              return $q.reject(response);
            }

            return $q.reject(response);
          }
        };
      }
    ]);
})(angular);

