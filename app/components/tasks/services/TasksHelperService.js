'use strict';

/**
 * tasks helper service
 */
(function(ng) {
  ng.module('supportVine')
    .factory('TasksHelperService', [
      '$rootScope', '$q','$modal', 'TASKS_EVENTS', 'TaskServices','UserService',
      function($rootScope, $q, $modal, TASKS_EVENTS, TaskServices, UserService) {

        /**
         * Create new task.
         *
         * @param {Object} taskRef
         * @returns {*|Function|promise|F|n}
         */
        function create(taskRef){
          return TaskServices.save(taskRef,function(response){
            $rootScope.$broadcast(
              TASKS_EVENTS.TASK_CHANGED,
              [TASKS_EVENTS.CREATED, taskRef, response]
            );
          }).$promise;
        }

        /**
         * Update existing task
         *
         * @param {Object} taskRef
         * @param {Boolean} broadcasted
         * @returns {*|Function|promise|F|n}
         */
        function update(taskRef, broadcasted){
          return TaskServices.update(taskRef,function(response){
            if(!broadcasted){
              $rootScope.$broadcast(
                TASKS_EVENTS.TASK_CHANGED,
                [TASKS_EVENTS.UPDATED, taskRef, response]
              );
            }
          }).$promise;
        }

        /**
         * Remove a task
         *
         * @param {Object} taskRef
         * @returns {*|Function|promise|F|n}
         */
        function remove(taskRef){
          return TaskServices.remove(taskRef,function(response){
            $rootScope.$broadcast(
              TASKS_EVENTS.TASK_CHANGED,
              [TASKS_EVENTS.REMOVED, taskRef, response]
            );
          }).$promise;
        }

        /**
         * Assign Task to user.
         *
         * @param {Object} taskRef
         * @param {Object} member
         * @returns {*|Function|promise|F|n}
         */
        function assignTask(taskRef, member){
          taskRef.owner = { key: member.key };
          return update(taskRef, true).then(function(response) {
            $rootScope.$broadcast(
              TASKS_EVENTS.TASK_CHANGED,
              [TASKS_EVENTS.ASSIGNED, taskRef, response]
            );
          }).$promise;
        }

        /**
         * Set task complete.
         *
         * @param {Object} taskRef
         * @returns {*|Function|promise|F|n}
         */
        function complete(taskRef){
          return update(taskRef, true).then(function(response) {
            $rootScope.$broadcast(
              TASKS_EVENTS.TASK_CHANGED,
              [TASKS_EVENTS.COMPLETED, taskRef, response]
            );
          }).$promise;
        }

        /**
         * Undo Task
         *
         * @param {Object} taskRef
         * @returns {*|Function|promise|F|n}
         */
        function undo(taskRef){
          taskRef.complete = !taskRef.complete;
          return update(taskRef, true).then(function(response) {
            $rootScope.$broadcast(
              TASKS_EVENTS.TASK_CHANGED,
              [TASKS_EVENTS.UNDONE, taskRef, response]
            );
          }).$promise;
        }

        /**
         * Load a task
         *
         * @param {Object} task
         * @returns {*}
         */
        function loadTasks(task){


          var deferred = $q.defer();
          TaskServices.queryByMember({ userKey: UserService.getUser().key },
            function(data) {
              var cases, i, task, tasks;
              tasks = data;
              cases = {};
              i = 0;
              while (i < tasks.length) {
                task = tasks[i];
                if (cases[task.parentCase.key] == null) {
                  cases[task.parentCase.key] = {
                    parentCase: task.parentCase,
                    tasks: []
                  };
                }
                cases[task.parentCase.key].tasks.push(task);
                i++;
              }
              deferred.resolve(cases);
            },deferred.reject
          );
          return deferred.promise;
        }

        /**
         * Open task modal windows
         *
         * @param {Object} task
         */
        function openEditTaskModal(task) {
          var modalInstance;
          modalInstance = $modal.open({
            templateUrl: 'components/tasks/views/editTaskModalView.html',
            controller: 'TaskEditCtrl',
            resolve: {
              teamMembers: function() {
                return UserService.getTeamMembers();
              },
              task: function() {
                return task;
              }
            }
          });
          modalInstance.result.then((function(task) {
            if (task.key) {
              return update(task);
            }
          }), function() {
            console.log('Edit Task Modal dismissed at: ' + new Date());
          });
        }

        // exposing what we want to expose.
        return {
          create:create,
          update:update,
          remove:remove,
          assignTask:assignTask,
          complete:complete,
          undo:undo,
          loadTasks : loadTasks,
          openEditTaskModal : openEditTaskModal
        }
      }
    ]);

})(angular);