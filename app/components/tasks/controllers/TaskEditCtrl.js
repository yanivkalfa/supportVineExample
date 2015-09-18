'use strict';

/**
 * Task edit controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('TaskEditCtrl', [
      '$scope', '$modalInstance', 'task',
      function($scope, $modalInstance, task) {

        // bind variables to scope.
        $scope.task = task;

        /**
         * Change task's owner
         *
         * @param {Object} task
         * @param {Object} member
         */
        $scope.assignTask = function(task, member) {
          task.owner = member;
        };

        /**
         * Close modal window with the new task object.
         */
        $scope.ok = function() {
          $modalInstance.close($scope.task);
        };

        /**
         * close modal window.
         */
        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }
    ]);

})(angular);