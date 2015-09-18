'use strict';

/**
 * Case List Controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('CaseListCtrl', [
      '$scope', 'CaseService', 'SvUtilsService', 'CaseTabsService','CaseHelperService', 'UserService', 'SvSelectChannelFilterService',
      function($scope, CaseService, SvUtilsService, CaseTabsService, CaseHelperService, UserService, SvSelectChannelFilterService) {

        var filterSortBy = [];
        // binding several variables to scope that we have saved in services.
        $scope.teamMembers = UserService.getTeamMembers();
        $scope.teamMemberHash = UserService.getTeamMemberHash();
        $scope.mychannels = UserService.getMyChannels();
        $scope.global = SvSelectChannelFilterService.getGlobal();

        // initializing scope variables and model.
        $scope.cases = [];
        $scope.selectedCases = [];
        $scope.caseStatus = "";
        $scope.sortFilter = {
          sortBy: '-createDate',
          filterBy: "",
          caseTypesKeys: [],
          caseStatus: 'OPEN',
          teamMembers: [],
          keyword: ""
        };
        $scope.sortByOptions = [
          {
            key: '-caseNumber',
            value: 'Case Number'
          }, {
            key: '-createDate',
            value: 'Most recent'
          }, {
            key: 'title',
            value: 'Case Title'
          }
        ];

        // restoring case tab server from local storage
        CaseTabsService.restore();
        // binding case tab service to scope
        $scope.caseTabs = CaseTabsService;

        // quering server for case belong to user
        CaseService.query({
          userKey: UserService.getUser().key
        }, function(cases){
          ng.forEach(cases, function(caze){
            caze.caseNumber = parseInt(caze.caseNumber) || caze.caseNumber;
          });
          $scope.cases = cases;
        });

        // Binding getType to scope
        $scope.getCaseType = CaseHelperService.getType;
        // binding checkboxToArray to scope
        $scope.clickCheck = SvUtilsService.checkboxToArray;
      }
    ]);

})(angular);