'use strict';

/**
 * Team member controller.
 */
(function(ng) {
  ng.module('supportVine')
    .controller('TeamMembersCtrl', [
      '$rootScope', '$scope', '$stateParams', '$state', 'CaseService', 'TeamMemberService', 'TeamChannelService', 'SvUtilsService', 'TeamChannelHelperService', 'RegisterService','UserService',
      function($rootScope, $scope, $stateParams, $state, CaseService, TeamMemberService, TeamChannelService, SvUtilsService, TeamChannelHelperService, RegisterService, UserService) {

        var previousSelected;

        // bind variables to scope.
        $scope.user = UserService.getUser();
        $scope.teamMembers = ng.copy(UserService.getTeamMembers());

        // instantiate TeamChannelHelperService
        $scope.TCH = new TeamChannelHelperService({
          srcCollection: UserService.getMyChannels().map(function(item,index){
           item.order = index;
           return item;
           })
        });

        /**
         * Get list of channels
         *
         * @param {Object} member
         */
        $scope.getChannelDropdownList = function(member) {
          if (!member) {
            return;
          }

          // get list of channels.
          TeamChannelService.query({
            userKey: member.key
          }, function(memeberAllowedChannels) {
            $scope.TCH.rebuildAllowed(member, memeberAllowedChannels);
            $scope.TCH.rebuildAvailable(member);
          });
        };

        /**
         * Select tab changes previousSelected 's value.
         *
         * @param {Object} channel
         */
        $scope.tabSelected = function(member) {
          $scope.isNewMember = false;
          if(previousSelected){
            previousSelected.isSelected = false;
          }
          member.isSelected = true;
          previousSelected = member;
          $scope.getChannelDropdownList(member);
          console.log(previousSelected);
        };

        /**
         * If we have channles we select the first one on instantation.
         */
        if ($scope.teamMembers.length > 0) {
          $scope.tabSelected($scope.teamMembers[0]);
        }

        /**
         * Toggle member status
         *
         * @param {Object} member
         * @returns {string}
         */
        function toggleMemberStatus(member){
          return member.status.toUpperCase() === "DISABLED" ? "ACTIVE" : "DISABLED";
        }

        /**
         * Toggle members status on server.
         *
         * @param {Object} member
         */
        $scope.toggleMemberStatus = function(member) {
          member.status = toggleMemberStatus(member);
          var memeberCopy;
          memeberCopy = ng.copy(member);
          delete memeberCopy.allowed;
          memeberCopy.allowedChannels = member.allowed.get();
          TeamMemberService.update({
            memberId: member.key
          }, memeberCopy, (function(data) {
            //alert('member updated successfully');
          }), function(err) {
            //alert('Update member failed');
          });
        };

        /**
         * Send an invitation to member that isn't fully register
         *
         * @param {Object} member
         * @returns {*|{method, url, isArray}}
         */
        $scope.sendInvitation = function(member) {
          if (member.status === 'INVITED') {
            return RegisterService.forgotpassword(
              {emailAddress:member.emailAddress},
              function(result) {
                member.invitations.push(result.date);
              },
              function(result){
                if(result.status = 404){
                  alert('Cannot find anyone with this email.');
                }
              }
            )
          }
        };

        /**
         * reset member model
         */
        function resetMember() {
          $scope.newMember = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            teamKey: UserService.getUser().teamKey
          };
        }

        /**
         * Reset previousSelected's selected.
         */
        function resetLastSelected() {
          previousSelected.isSelected = false;
        }

        /**
         * open new member window - reset the require variables.
         */
        $scope.openNewMember = function() {
          resetMember();
          resetLastSelected();
          $scope.isNewMember = true;
        };

        /**
         * create new member or save current one with new details.
         *
         * @param {Object} member
         */
        $scope.saveMember = function(member) {
          var memeberCopy;
          if (!member.key) {
            // create new member.
            TeamMemberService.add(member, (function(newMember) {
              resetMember();
              $scope.teamMembers.push(newMember);
              $scope.tabSelected(newMember);

            }), function(result) {
              if(result.status = 409){
                alert('User with this email already exist.');
                return
              }
              alert('Add member failed');
            });
          } else {
            memeberCopy = ng.copy(member);
            delete memeberCopy.allowed;
            delete memeberCopy.isSelected;
            memeberCopy.allowedChannels = member.allowed.get();
            // save existing member.
            TeamMemberService.update({
              memberId: member.key
            }, memeberCopy, (function(data) {
              //alert('member updated successfully');
            }), function(err) {
              //alert('Update member failed');
            });
          }
        };

        /**
         * Check if member is the current user.
         *
         * @param {Object} member
         * @returns {boolean}
         */
        $scope.isCurrentUser = function(member) {
          return member.key === UserService.getUser().key;
        };

        /**
         * Remove channel from member
         *
         * @param {Object} member
         * @param {Object} channel
         */
        $scope.removeChannel = function(member, channel) {
          if (member.key === UserService.getUser().key) {
            alert('You are not allowed to remove channels from yourself');
            return;
          }
          var index = SvUtilsService.indexOf(UserService.getMyChannels(), channel.key, 'key');
          if(index > -1) {
            channel.order = index;
          }

          $scope.TCH.remove(member, channel);
          TeamChannelService.removeMember({
            id: channel.key,
            userKey: member.key
          }, function() {});
        };

        /**
         * Add a channel to member
         *
         * @param {Object} member
         * @param {Object} channel
         */
        $scope.addChannel = function(member, channel) {
          $scope.TCH.add(member, channel);
          TeamChannelService.addMember({
            id: channel.key,
            userKey: member.key
          }, function() {});
        };
      }
    ])

})(angular);




/*
 $scope.deleteMember = function(member) {
 TeamMemberService.deleteMember({
 key: member.key
 }, function(data) {
 console.log(data);
 init();
 }, function(err) {
 alert('remove member failed');
 });
 };*/