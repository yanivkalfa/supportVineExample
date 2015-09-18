'use strict';

/**
 * Archive State
 */
(function(ng){
  ng.module('supportVine')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('landing.archive', {
          url: '/archive?channelKey',
          templateUrl: 'components/archive/views/ArchiveView.html',
          controller: 'ArchiveCtrl'
        })
        .state('landing.archive.recent', {
          url: '/recent?channelKey',
          templateUrl: 'components/archive/views/ArchiveRecentView.html',
          controller: 'ArchiveRecentCtrl'
        })
        .state('landing.archive.replies', {
          url: '/replies?channelKey',
          templateUrl: 'components/archive/views/ArchiveRepliesView.html',
          controller: 'ArchiveRepliesCtrl'
        })
    }]);
})(angular);
