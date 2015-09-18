'use strict';

/**
 * Main file of the application
 * Entry point for the app.
 */
(function(ng) {
  ng.module('supportVine', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'localytics.directives',
    'ngFileUpload',
    'infinite-scroll',
    'satellizer',
    'angular-loading-bar',
    'ngResource',
    'ngRoute',
    'toaster'
  ])
    .config([
      '$httpProvider', '$authProvider', '$injector', '$locationProvider', 'ENV',
      function($httpProvider, $authProvider, $injector, $locationProvider, ENV) {

        // setting $auth provider configuration
        ng.extend($authProvider, ENV.authProvider);

        // html 5 mode getting rid of #
        $locationProvider.html5Mode(true);

        // adding an interceptor
        $httpProvider.interceptors.push(['$injector', function ($injector) {
          return $injector.get('AuthInterceptorService');
        }]);
      }])
    .run([
      '$rootScope', '$auth', '$state',
      function ($rootScope, $auth, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

          // checking if we are trying to visit un protected page
          if (toState.name === 'login' ||
            toState.name === 'signup' ||
            toState.name === 'forgotpassword' ||
            toState.name === 'resetpassword' ||
            toState.name === 'errorPage'
          ) {
            console.log('continue');
          } else if (!$auth.isAuthenticated()) {
            // is not authenticated then we stop change state remove token, and go to login.
            console.log('Not');
            event.preventDefault();
            $auth.removeToken();
            $state.go('login');
          }
        });
      }])
    .controller('supportVineAppController', [ function() { } ])

})(angular);