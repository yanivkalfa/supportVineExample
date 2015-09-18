'use strict';

/**
 * InboxStates
 */
(function(ng){
  ng.module('supportVine')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('landing.inbox', {
          url: '/inbox?channelKey',
          templateUrl: 'components/inbox/views/InboxView.html',
          controller: 'InboxCtrl'
        })
        .state('landing.inbox.detail', {
          url: '/:key',
          templateUrl: 'components/inbox/views/InboxDetailView.html',
          controller: 'InboxDetailCtrl'
        })
    }]);
})(angular);
