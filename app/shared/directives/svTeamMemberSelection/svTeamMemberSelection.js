'use strict';

/**
 * Team member selection Directive - makes use of UserService
 * It adds a drop down with all available users
 *
 * Usage:
 *
 *  <sv-team-member-selection
 *    class="ace-icon"
 *    select="selectTeamMemberForTask($selectedMember)">
 *    <img class="img-rounded" src="http://s.gravatar.com/avatar/{{teamMemberHash[task.owner.key].emailAddress|md5}}?s=30" alt=""  >
 *  </sv-team-member-selection>
 *
 */
(function(ng) {
  ng.module('supportVine')
    .directive('svTeamMemberSelection', ['UserService', function(UserService) {
      return {
        restrict: 'E',
        templateUrl: 'shared/directives/svTeamMemberSelection/views/svTeamMemberSelectionView.html',
        scope: {
          title: '@',
          select: '&',
          dropdownClass: '@',
          avatarSize: '@',
          buttonClass: '@',
          nullValue: '@'
        },
        transclude: true,
        replace: true,
        link: function(scope, elem, attr) {
          scope.team = UserService.getTeamMembers();
          scope.teamHash = UserService.getTeamMemberHash();
        }
      };
    }])
})(angular);