'use strict';

/**
 * SV task directive.
 */
(function(ng) {
  ng.module('supportVine')
    .directive('svTask', ['UserService', 'TasksHelperService', function(UserService, TasksHelperService) {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          task: '='
        },
        templateUrl: 'components/tasks/directives/views/taskDirectiveView.html',
        link: function(scope, element, attr) {

          // bind variables to scope from signletones services.
          scope.team = UserService.getTeamMembers();
          scope.teamHash = UserService.getTeamMemberHash();

          scope.assignTask = TasksHelperService.assignTask;
          scope.complete = TasksHelperService.complete;
          scope.openEditTaskModal = TasksHelperService.openEditTaskModal;
          scope.remove = TasksHelperService.remove;
        }

      };
    }])

  /**
   * Stop Event directive.
   */
    .directive('stopEvent', function() {
      return {
        restrict: 'A',
        link: function(scope, element, attr) {
          element.bind('click', function(e) {
            e.stopPropagation();
          });
        }
      };
    });

})(angular);