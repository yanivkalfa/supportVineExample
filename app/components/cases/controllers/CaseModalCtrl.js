'use strict';

(function(ng) {
  ng.module('supportVine')
    .controller('CaseModalCtrl', [
      '$rootScope', '$scope', '$modalInstance', 'caze', 'ENUM', 'UserService', 'SvUtilsService',
      function($rootScope, $scope, $modalInstance, caze, ENUM, UserService, SvUtilsService) {
        // binding several mychannel to scope
        $scope.mychannels = UserService.getMyChannels();

        // if we are creating a new scope create a case model
        if (!caze) {
          $scope.caze = {
            browserData : null,
            caseNumber : null,
            caseStatus : ENUM.caseStatus.OPEN.value,
            caseTypesKeys: [],
            channelKey : null,
            title: null,
            description : null,
            assignedUsers: [{key:UserService.getUser().key}],
            totalValue: null,
            createDate: Date.now(),
            updateDate: Date.now()
          };

          // settign modal action to create
          $scope.modalAction = 'Create';
        } else {

          // binding case to scope
          $scope.caze = caze;

          // setting modal action to save
          $scope.modalAction = 'Save';
        }

        // validator function check if any case type is selected
        function missingCaseType(){
          return !Boolean($scope.caze.caseTypesKeys.length);
        }

        // on key press we invoke scope.ok which closes and
        $scope.onKeyPress = function($event, ngForm) {
          var key;
          key = $event.which || $event.keyCode;
          if (key === 13) {
            return $scope.ok(ngForm);
          }
        };

        /**
         * Closes the modal window with the new case object if validation pass
         * @param ngForm
         */
        $scope.ok = function(ngForm) {
          $scope.missingCaseType = missingCaseType();
          if (ngForm.$invalid || $scope.missingCaseType) {
            $scope.invalidSubmitAttempt = true;
            return;
          }
          $modalInstance.close($scope.caze);
        };

        // cancel modal window
        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };

        // Select / change case type
        $scope.toggleCaseType = function(caseTypeName) {
          SvUtilsService.checkboxToArray($scope.caze.caseTypesKeys, ENUM.caseTypes[caseTypeName]);
          $scope.missingCaseType = missingCaseType();
        };

        // Checking if we got a case type
        $scope.isCaseType = function(caseName) {
          return !($scope.caze.caseTypesKeys.indexOf(ENUM.caseTypes[caseName]) < 0);
        };

      }
    ]);

})(angular);