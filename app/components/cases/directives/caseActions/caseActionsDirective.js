'use strict';

(function(ng) {
  ng.module('supportVine')
    .directive('caseActions', [
      'CaseHelperService', 'SvMainNavTabsService', 'UserService',
      function( CaseHelperService, SvMainNavTabsService, UserService) {
        return {
          restrict: 'EA',
          templateUrl: 'components/cases/directives/caseActions/views/caseActionsView.html',
          scope: {},
          link: function(scope, elem) {

            // update scopes case from case helper service.
            scope.updateCase = function(){
              scope.case = CaseHelperService.getCurrent();
              return true;
            };

            // define pin case function
            scope.pinCase = CaseHelperService.pinCase;

            // define is case pinned function
            scope.isCasePinned = _.bind(UserService.isCasePinned,UserService);

            // define open create case modal function
            scope.openCreateCaseModal = CaseHelperService.openCreateCaseModal;

            // updating case on first run.
            scope.updateCase();

          }
        };
      }
    ]);

})(angular);