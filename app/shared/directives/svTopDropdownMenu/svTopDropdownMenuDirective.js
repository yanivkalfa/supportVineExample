'use strict';

/**
 * This is directive for the drop down top right menu
 *
 * For username / billing / team
 */
(function(ng) {
  ng.module('supportVine')
    .directive('svTopDropdownMenu', [
      '$auth','UserService', 'SvLiveApiService',
      function(  $auth, UserService, SvLiveApiService) {
        return {
          restrict: 'EA',
          templateUrl: 'shared/directives/svTopDropdownMenu/views/svTopDropdownMenuView.html',
          scope: {},
          link: function(scope, elem) {

            // setting several globally used variables.
            scope.user = UserService.getUser();

            // log user out, destroying user service and disconnecting sv live api service.
            scope.logout = function() {
              $auth.logout().then(function() {
                UserService.destroy();
                SvLiveApiService.disconnect();
                console.log('See you next time!');
              });
            };
          }
        };
      }
    ]);

})(angular);