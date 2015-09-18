'use strict';

/**
 * Cases states
 */
(function(ng){
  ng.module('supportVine')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('landing.cases', {
          abstract: true,
          url: '/cases',
          templateUrl: 'components/cases/views/CasesView.html',
          controller: 'CasesCtrl'
        })
        .state('landing.cases.list', {
          url: "",
          templateUrl: 'components/cases/views/CaseListView.html',
          controller: 'CaseListCtrl'
        })
        .state('landing.cases.detail', {
          url: '/:key/:msgKey',
          templateUrl: 'components/cases/views/CaseDetailView.html',
          controller: 'CaseDetailCtrl'
        })
        .state('landing.cases.archived', {
          url: '/archived/:key',
          templateUrl: 'components/cases/views/CaseListView.html',
          controller: 'CaseListCtrl'
        });
    }]);
})(angular);
