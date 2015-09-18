'use strict';

/**
 * Tasks controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('TasksCtrl', [
      '$scope', '$timeout', 'MessageServices', 'TasksHelperService', 'TASKS_EVENTS','UserService','SvSelectChannelFilterService', 'SvUtilsService',
      function($scope, $timeout, MessageServices, TasksHelperService, TASKS_EVENTS, UserService, SvSelectChannelFilterService, SvUtilsService) {
        var removeFromUndo, self;

        // bind variables to scope.
        $scope.assignedMessagesDoneLoading = false;
        $scope.taskCasesDoneLoading = false;
        $scope.global = SvSelectChannelFilterService.getGlobal();
        $scope.undoTasks = [];
        self = this;

        // remove task from undo array.
        removeFromUndo = function(task) {
          var index;
          index = $scope.undoTasks.indexOf(task);
          if(index <= -1) {
            return false;
          }
          $scope.undoTasks.splice(index,1);
          return true;
        };

        // bind undo function to scope.
        $scope.undoTask = TasksHelperService.undo;

        /**
         * load tasks and bind them to task cases
         */
        $scope.loadTasks = function() {
          TasksHelperService.loadTasks().then(function(taskCases){
            $scope.taskCases = taskCases;
            $scope.taskCasesDoneLoading = true;
          });
        };

        /**
         * Load assigned messages to scope.
         *
         */
        $scope.loadMessages = function() {
          $scope.assignedMessages = MessageServices.filterForMember({
            userKey: UserService.getUser().key
          }, function() {
            return $scope.assignedMessagesDoneLoading = true;
          });
        };

        // load tasks
        $scope.loadTasks();

        // load messages
        $scope.loadMessages();

        /**
         * After assigning task this is the visual representation function
         *
         * @param {Object} task
         */
        self.assigned = function(task) {
          console.log('Task is reassigned', task);
        };

        /**
         * After adding a tasks this is the visual representation function
         *
         * @param {Object} task
         */
        self.add = function(task) {
          var index,caseKey;
          caseKey = task.parentCase.key;
          index = $scope.taskCases[caseKey].tasks.indexOf(task);
          if(index > -1) {
            return false;
          }

          $scope.taskCases[caseKey].tasks.push(task);
        };

        /**
         * After removing a task this is the visual representation function
         *
         * @param {Object} task
         * @returns {boolean}
         */
        self.removed = function(task) {
          var index,caseKey;
          caseKey = task.parentCase.key;
          index = $scope.taskCases[caseKey].tasks.indexOf(task);
          if(index <= -1) {
            return false;
          }
          $scope.taskCases[caseKey].tasks.splice(index,1);

        };

        /**
         * After completing a task this is the visual representation function
         *
         * @param task
         */
        self.completed = function(task) {
          self.removed(task);
          $scope.undoTasks.push(task);
          $timeout(function() {
            removeFromUndo(task);
          }, 15000);

        };

        /**
         * After un doing a task this is the visual representation function
         *
         * @param task
         */
        self.undone = function(task) {
          self.add(task);
          removeFromUndo(task);
        };

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
          self[method].apply(self, msg);
        });

      }
    ])

})(angular);