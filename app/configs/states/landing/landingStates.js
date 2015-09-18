'use strict';

/**
 * Landing States
 */
(function(ng){
  ng.module('supportVine')
    .config([
      '$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('inbox');

        $stateProvider.state('landing', {
          abstract: true,
          url: "",
          templateUrl: 'components/landing/views/LandingView.html',
          controller: 'LandingCtrl',
          resolve: {
            UserServiceData: ['$state', 'UserService', function($state, UserService) {
              return UserService.init().catch(function(){
                // could not resolve/authenticate users
                $state.go('login');
              });
            }]
          }
        });
      }
    ]);
})(angular);
