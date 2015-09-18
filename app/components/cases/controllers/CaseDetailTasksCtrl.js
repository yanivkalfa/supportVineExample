'use strict';

/**
 * Case detail task controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('CaseDetailTasksCtrl', [
      '$scope', '$stateParams', 'CaseService', '$modal', 'SvUtilsService', 'TasksHelperService', 'TASKS_EVENTS',
      function($scope, $stateParams, CaseService, $modal, SvUtilsService, TasksHelperService, TASKS_EVENTS) {
        var self = this;

        /**
         * Set the owner of a task
         *
         * @param {Object} teamMember
         */
        $scope.selectTeamMemberForTask = function(teamMember) {
          $scope.task.owner = teamMember;
        };

        /**
         * Set the parent of a task to the current case
         * and then saves the task to the server.
         *
         * @returns {$scope.task}
         */
        $scope.addTask = function() {
          $scope.task.parentCase = {
            key: $scope.caze.key
          };

          return TasksHelperService.create($scope.task);
        };

        /**
         * Reset the task name.
         */
        function resetTask() {
          $scope.task.name = "";
        }

        /**
         * Load related tasks
         *
         * @param {String} caseKey
         */
        function loadRelatedTasks(caseKey){
          CaseService.queryTasks({ key: caseKey }, function(relatedTasks) {
            $scope.relatedTasks = relatedTasks;
          });
        }
        loadRelatedTasks($stateParams.key);

        /**
         * Add team member to case
         *
         * @param {Object} teamMember
         * @returns {boolean}
         */
        function addTeamMemberToCase(teamMember) {
          if (SvUtilsService.lookupIndex($scope.caze.assignedUsers, 'key', teamMember.key) !== -1) {
            return false;
          }
          $scope.caze.assignedUsers.push({
            key: teamMember.key
          });
          CaseService.update($scope.caze);
        }

        /**
         * After creating a tasks this is the visual representation function
         *
         * @param {Object} refTask
         * @param {Object} responseTask
         */
        self.created = function(refTask, responseTask) {
          $scope.relatedTasks.push(responseTask);
          resetTask();
          $scope.newTask.$setPristine();
        };

        /**
         * After assigning task this is the visual representation function
         *
         * @param {Object} task
         */
        self.assigned = function(task) {
          addTeamMemberToCase(task.owner);
        };

        /**
         * After removing a task this is the visual representation function
         *
         * @param {Object} task
         * @returns {boolean}
         */
        self.removed = function(task) {
          var index;
          index = $scope.relatedTasks.indexOf(task);
          if(index <= -1) {
            return false;
          }
          $scope.relatedTasks.splice(index,1);
        };

        // noop
        self.completed = function(task) {};

        /**
         * event router function. On any task server action it routs to the the right representation function
         *
         */
        $scope.$on(TASKS_EVENTS.TASK_CHANGED, function updateScope(event, msg){
          var method = msg[0];
          if(!method || !ng.isFunction(self[method])){
            return false;
          }
          msg.splice(0,1);
          self[method].apply(self, msg)
        });
      }
    ]);

})(angular);