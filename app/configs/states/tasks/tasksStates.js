'use strict';

/**
 * Tasks States
 */
(function(ng){
  ng.module('supportVine')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider.state('landing.tasks', {
        url: '/tasks',
        templateUrl: 'components/tasks/views/tasksView.html',
        controller: 'TasksCtrl'
      });
    }]);
})(angular);
