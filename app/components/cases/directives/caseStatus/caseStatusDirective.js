'use strict';

/**
 * Case status directive is used in status list button
 *
 */
(function(ng) {
  ng.module('supportVine')
    .directive('caseStatus', [
      'CaseHelperService', 'ENUM',
      function(CaseHelperService, ENUM) {
        return {
          restrict: 'EA',
          transclude: true,
          templateUrl: 'components/cases/directives/caseStatus/views/caseStatusView.html',
          scope: {
            caseStatus: '=?'
          },
          link: function(scope, elem) {

            // holds current available status
            scope.statuses = [];

            // binding current case to scope.
            scope.case = CaseHelperService.getCurrent();

            /**
             * Watch handler function - once case status changes this function is being invoked
             * It will check the current status and will set statuses array accordingly.
             *
             * @param {String} nVal
             * @param {String} oVal
             */
            function buildSelectOptions(nVal,oVal){
              switch(nVal){
                case 'OPEN':
                  scope.statuses = [
                    ENUM.caseStatus.ARCHIVED,
                    ENUM.caseStatus.WAITING
                  ];
                  break;
                case 'ARCHIVED':
                  scope.statuses = [
                    ENUM.caseStatus.OPEN
                  ];
                  break;
                case 'WAITING':
                  scope.statuses = [
                    ENUM.caseStatus.OPEN,
                    ENUM.caseStatus.ARCHIVED
                  ];
                  break;
                default :
                  scope.statuses = [
                    ENUM.caseStatus.ARCHIVED,
                    ENUM.caseStatus.WAITING
                  ];
              }
            }

            // watch case status
            scope.$watch('caseStatus',buildSelectOptions);

            // define set status function
            scope.setStatus = CaseHelperService.setStatus;
          }
        };
      }
    ]);

})(angular);