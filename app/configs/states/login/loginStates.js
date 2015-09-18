'use strict';

/**
 * Login States
 */
(function(ng){
  ng.module('supportVine')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('signup', {
          url: '/signup',
          templateUrl: 'components/login/views/SignupView.html',
          controller: 'SignupCtrl'
        })
        .state('login', {
          url: '/login?isRps',
          templateUrl: 'components/login/views/loginView.html',
          controller: 'LoginCtrl'
        })
        .state('forgotpassword', {
          url: '/forgotpassword?confirmEmail',
          templateUrl: 'components/login/views/ForgotPasswordView.html',
          controller: 'ForgotPasswordCtrl'
        })
        .state('resetpassword', {
          url: '/resetpassword?sptoken',
          templateUrl: 'components/login/views/ResetPasswordView.html',
          controller: 'ResetPasswordCtrl'
        });
    }]);
})(angular);
