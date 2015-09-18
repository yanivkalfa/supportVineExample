'use strict';

/**
 * Inbox Details Controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('InboxDetailCtrl', [
    '$scope', '$state', '$stateParams', '$filter', 'MessageServices', 'CaseTypeahead', 'TeamMemberService', 'ENUM', 'SvUtilsService','UserService',
    function($scope, $state, $stateParams, $filter, MessageServices, CaseTypeahead, TeamMemberService, ENUM, SvUtilsService, UserService) {
      var checkActionButtonEnabled, localFilter;
      localFilter = $filter('getProcessMessageActionTitleFilter');

      // binding variables to scope
      $scope.teamMemberHash = UserService.getTeamMemberHash();
      $scope.missingCaseType = false;

      /**
       * Resets replay object
       */
      function resetReplay (){
        $scope.toProcess = {
          caseTypesKeys :[],
          assignMember : null,
          reply : null,
          replyFrom : UserService.getUser().key,
          assignCase: null,
          caseTitle : ""
        };
      }
      resetReplay();

      /**
       * Remove message from messages array
       *
       * @param {String} key
       * @returns {boolean}
       */
      function removeMessage(key){
        if(!key) return false;
        var i;
        i = SvUtilsService.lookupIndex($scope.messages, 'key', key);
        if (i > -1) {
          $scope.messages.splice(i, 1);
          if($scope.messages.length){
            $state.go('landing.inbox.detail', {key:$scope.messages[0].key});
          }else{
            $state.go('landing.inbox');
          }
        }
      }

      /**
       * Enable or Disable button
       */
      checkActionButtonEnabled = function() {
        $scope.actionButtonEnabled = localFilter($scope.selectedMessage, $scope.toProcess) !== 'Select Action To Do';
      };

      checkActionButtonEnabled();

      // watch toProcess
      $scope.$watch('toProcess', checkActionButtonEnabled, true);

      /**
       * validate if we have selected case types
       * @returns {boolean|null|string}
       */
      function missingCaseType(){
        var length = $scope.toProcess.caseTypesKeys.length;
        return !length && ($scope.toProcess.assignCase || $scope.toProcess.caseTitle);
      }

      /**
       * Load current message and all its details plus setting process
       *
       * @param key
       */
      $scope.loadMessage = function(key) {
        $scope.selectedMessage = null;
        if (key) {
          MessageServices.get({
            key: key
          }, function(selectedMessage) {
            $scope.selectedMessage = selectedMessage;
            resetReplay();
            $scope.toProcess.caseTypesKeys = $scope.selectedMessage.parentCase ? ng.copy($scope.selectedMessage.parentCase.caseTypesKeys) : ng.copy($scope.selectedMessage.caseTypesKeys);
            $scope.toProcess.assignMember = $scope.selectedMessage.assignedTo ? $scope.selectedMessage.assignedTo.key : null;

            $scope.toProcess.parentCase = ng.copy($scope.selectedMessage.parentCase) || {title:""};
            if($scope.selectedMessage.parentCase && $scope.selectedMessage.parentCase.key){
              $scope.toProcess.assignCase = $scope.selectedMessage.parentCase.key;
            }else{
              $scope.toProcess.caseTitle = '';
            }
          });
        }
      };

      /**
       * tag a message as archived (not working yet)
       * @param key
       */
      $scope.archiveMessage = function(key) {
        MessageServices.archive({key:$scope.selectedMessage.key}, {}, function() {
          removeMessage($scope.selectedMessage.key);
        });
      };

      /**
       * process a message after clicking the "submit button"
       *
       * @param key
       * @returns {boolean}
       */
      $scope.processMessage = function(key) {

        //Check if we go case type selected
        $scope.missingCaseType = missingCaseType();
        if($scope.missingCaseType) {
          return false;
        }

        //set allowed field for _.pick use
        var allowedFields = ['caseTypesKeys', 'assignMember'];

        // if replay was enter add it to allowed array
        if ($scope.toProcess.reply) {
          allowedFields.push('reply','replyFrom');
        }

        //Check if we have assigned the case to someone if so adding to allowed array
        if ($scope.toProcess.assignCase) {
          allowedFields.push('assignCase');

          // checking if we have a case title if so adding it to allowed array
        } else if($scope.toProcess.caseTitle){
          allowedFields.push('caseTitle');
        }
        // Process the message with the details we collected
        MessageServices.process({key : $scope.selectedMessage.key},_.pick($scope.toProcess,allowedFields), function(data) {
          if (data.archived) {
            removeMessage($scope.selectedMessage.key);
          } else {
            $scope.loadMessage(data.key);
          }
        });
      };

      /**
       * Get all case from server that belong to user so user can select
       * @param {String} val
       * @returns {*}
       */
      $scope.getCases = function(val) {
        return CaseTypeahead.getCases(UserService.getUser().key).then(function(res) {
          var cases;
          cases = $.grep(res.data, function(el, i) {
            var filterBy, title;
            title = el.title.toLowerCase();
            filterBy = val.toLowerCase();
            if (title.indexOf(filterBy) > -1) {
              return true;
            } else {
              return false;
            }
          });
          cases = cases.slice(0, 10);
          cases.unshift({
            key: null,
            title: val,
            caseNumber: 'new'
          });
          return cases;
        });
      };

      /**
       * set toProcess.assignMember 's value to new teamMember
       *
       * @param {Object} teamMember
       */
      $scope.assignTeamMember = function(teamMember) {
        $scope.toProcess.assignMember = (teamMember && teamMember.key) ? teamMember.key : null;
      };

      /**
       * select/deselect case type
       *
       * @param {String} caseTypeName
       */
      $scope.toggleCaseType = function(caseTypeName) {
        SvUtilsService.checkboxToArray($scope.toProcess.caseTypesKeys, ENUM.caseTypes[caseTypeName]);
        $scope.missingCaseType = missingCaseType();
      };

      /**
       * When a case is selected we either set assignCase or caseTitle's value
       *
       * @param {Object} caze
       */
      $scope.onSelectCase = function(caze) {
        $scope.toProcess.parentCase = caze;

        if(caze.key){
          $scope.toProcess.assignCase = caze.key;
        }else{
          $scope.toProcess.caseTitle = caze.title;
        }
      };

      /**
       * Check if we've a case type selected
       *
       * @param {String} caseName
       * @returns {boolean}
       */
      $scope.isCaseType = function(caseName) {
        if (!$scope.toProcess || !$scope.toProcess.caseTypesKeys) {
          return false;
        }

        return $scope.toProcess.caseTypesKeys.indexOf(ENUM.caseTypes[caseName]) > -1;
      };

      /**
       * Format the visual representation of the submit button
       * @param {Object} c
       * @returns {*}
       */
      $scope.formatCaseDropdownValue = function(c) {
        var val;
        if (!c) {
          return "";
        }
        val = c.title;
        if (c.key) {
          val = '#' + c.caseNumber + ' ' + val;
        }
        return val;
      };

      // set the parent's current message.
      $scope.$parent.selectedMessageKey = $stateParams.key;
      // load message
      $scope.loadMessage($stateParams.key);
    }
  ]);

})(angular);