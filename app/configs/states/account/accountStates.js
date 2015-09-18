'use strict';

/**
 * Account states
 */
(function(ng){
  ng.module('supportVine')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('landing.account', {
          url: '/account',
          templateUrl: 'components/account/views/AccountView.html',
          controller: 'AccountCtrl'
        })
        .state('landing.account.billing', {
          url: '/billing',
          templateUrl: 'components/account/views/AccountBillingView.html',
          controller: 'AccountBillingCtrl'
        })
        .state('landing.account.plans', {
          url: '/plans',
          templateUrl: 'components/account/views/AccountPlansView.html',
          controller: 'AccountPlansCtrl'
        })
        .state('landing.account.close', {
          url: '/close',
          templateUrl: 'components/account/views/AccountCloseView.html',
          controller: 'AccountCloseCtrl'
        })
    }]);
})(angular);