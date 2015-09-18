'use strict';
/**
 * Case Details Controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('CaseDetailCtrl', [
      '$scope', '$state', '$stateParams', 'Upload', 'CaseService', 'TeamMemberService', 'UserService',
      'MessageServices', '$filter', 'PinnedCasesChannelService', 'SvUtilsService', 'CaseTabsService','CaseHelperService','ENUM',
      function($scope, $state, $stateParams, Upload, CaseService, TeamMemberService, UserService,
               MessageServices, $filter, PinnedCasesChannelService, SvUtilsService, CaseTabsService , CaseHelperService, ENUM) {
        var addTo, getAllConversations, initNote, initReply, loadcaseconversation, loadcasedetail, loadcasemails, updateAvailableTeam, addToAllConversations;

        // binding variable to scope
        $scope.msgKey = $stateParams.msgKey;
        $scope.teamMemberHash = UserService.getTeamMemberHash();
        $scope.teamMembers = UserService.getTeamMembers();

        /**
         * resetting note scope object
         */
        initNote = function() {
          $scope.note = {
            whoSaidIt: {
              key: UserService.getUser().key
            },
            replyText: "",
            conversation: {
              key: $scope.cazeConversation.key
            }
          };
        };

        /**
         * Resetting reply scope object
         */
        initReply = function() {
          $scope.reply = {
            replyFrom: {
              // set to current user key
              key: UserService.getUser().key
            },
            replyToMessageKey: null,
            body: ""
          };
        };

        /**
         * Get all conversation messages
         *
         * @returns {*}
         */
        getAllConversations = function() {
          if (!$scope.cazeConversation.statements || !$scope.caze.mail) {
            return;
          }
          return $scope.allConversations = $scope.cazeConversation.statements.concat($scope.caze.mail);
        };

        /**
         * adds a message to the beginning of conversation array
         *
         * @param {Object} toAdd
         * @returns {*|Number}
         */
        addToAllConversations = function(toAdd) {
          return $scope.allConversations.unshift(toAdd);
        };

        /**
         * get all conversation and make use of addToAllConversations
         *
         * @param {String} key
         */
        loadcaseconversation = function(key) {
          $scope.cazeConversation = CaseService.queryConversation({
            key: key
          }, function() {
            getAllConversations();
            initNote();
          });
        };

        /**
         * Load the current case details
         * get its pinned cases
         * init task (reset task model)
         * Uses case helper service to get current case
         *
         * @param {String} key
         */
        loadcasedetail = function(key) {
          $scope.caze = CaseService.get({
            key: key
          }, function() {
            loadcasemails($scope.caze.key);
            UserService.getUserPinnedCases();
            $scope.initTask($scope.caze);
            CaseHelperService.setCurrent($scope.caze);
          });
        };

        /**
         * Get all emails belong to a case
         *
         * @param {String} key
         */
        loadcasemails = function(key) {
          $scope.caze.mail = MessageServices.queryForCase({
            caseKey: key
          }, function() {
            getAllConversations();
            initReply();
          });
        };

        /**
         * reset task model
         *
         * @param caze
         */
        $scope.initTask = function(caze) {
          $scope.task = {
            name: "",
            owner: (caze.assignedUsers.length > 0 ? caze.assignedUsers[0] : null),
            parentCase: caze.parentCase
          };
        };

        /**
         * Add object to array
         *
         * @param {Array} to
         * @param {Object} add
         * @returns {*|Number}
         */
        addTo = function(to, add) {
          return to.unshift(add);
        };

        /**
         * Add note to database for a case.
         * Upload files if there is any.
         *
         * add the new note to case conversation array
         * reset the note model
         * add the note to all conversation
         *
         */
        $scope.addNote = function() {
          CaseService.createStatement({
            key: $scope.caze.key
          }, $scope.note, function(data) {
            $scope.uploadFiles(data, 'note');
            addTo($scope.cazeConversation.statements, data);
            initNote();
            addToAllConversations(data);
          });
        };

        /**
         * Add customer replay ( replay to an email )
         * upload files if there is any
         *
         * add the new email to case conversation array
         * reset the email model
         * add the email to all conversation
         *
         */
        $scope.addCustomerReply = function() {
          $scope.reply.replyToMessageKey = $scope.caze.mail[0].key;
          MessageServices.save($scope.reply, function(data) {
            $scope.uploadFiles(data, 'replay');
            addTo($scope.caze.mail, data);
            initReply();
            addToAllConversations(data);

            // Changing case status to waiting
              CaseHelperService.setStatus($scope.caze, ENUM.caseStatus.WAITING.value);
          });
        };

        /**
         * Upload file to server
         *
         * @param {Object} parent
         * @param {String} type
         * @returns {boolean}
         */
        $scope.uploadFiles = function(parent, type) {
          var file, files, i, l;
          files = $('#' + type + '-input-file').data('ace_input_files');
          if (!files) {
            return false;
          }
          i = 0;
          l = files.length;
          while (i < l) {
            file = files[i];
            $scope.upload = Upload.upload({
              url: '/supportvine/aggregators/cases/statements/' + parent.key + '/attachments',
              method: 'POST',
              data: {},
              file: file
            }).progress(function(evt) {
              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
              addTo(parent.attachments, data);
            });
            i++;
          }
        };

        /**
         * set replay.teammember for the current member
         *
         * @param teamMember
         */
        $scope.selectTeamMemberForReply = function(teamMember) {
          $scope.reply.teamMember = teamMember;
        };

        /**
         * Remove a team member from a case
         *
         * @param {Object} teamMember
         */
        $scope.removeTeamMember = function(teamMember) {
          $scope.caze.assignedUsers.splice(SvUtilsService.lookupIndex($scope.caze.assignedUsers, 'key', teamMember.key), 1);
          CaseHelperService.update($scope.caze);
        };

        /**
         * Add a team member to a case
         *
         * @param {Object} teamMember
         */
        $scope.addTeamMember = function(teamMember) {
          $scope.caze.assignedUsers.push({
            key: teamMember.key
          });
          CaseHelperService.update($scope.caze);
        };

        /**
         * Poke a case
         */
        $scope.poke = function() {
          CaseService.poke($scope.caze);
        };

        /**
         * finds the index of a teamMember inside case assignedUser array
         *
         * @param {Object} teamMember
         * @returns {Number}
         */
        $scope.filterAssignedMembers = function(teamMember) {
          return (SvUtilsService.lookupIndex($scope.caze.assignedUsers, 'key', teamMember.key) <= -1);
        };

        /**
         * Updates available team member array by filtering the ones we already used/
         */
        updateAvailableTeam = function() {
          $scope.availableTeamMembers = UserService.getTeamMembers().filter($scope.filterAssignedMembers);
        };

        // watches teammembers collection for changes
        $scope.$watchCollection('teamMembers', updateAvailableTeam);

        // watches case assigned used users for change
        $scope.$watchCollection('caze.assignedUsers', updateAvailableTeam);

        // load current case
        loadcasedetail($stateParams.key);

        // load case conversation
        loadcaseconversation($stateParams.key);

        // set current case as the active case for tabs
        CaseTabsService.setActiveTab($stateParams.key);
      }
    ]);

})(angular);