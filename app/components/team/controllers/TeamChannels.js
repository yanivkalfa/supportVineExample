'use strict';

/**
 * Team channels controller.
 */
(function(ng) {
  ng.module('supportVine')
    .controller('TeamChannelsCtrl', [
      '$rootScope', '$scope', '$stateParams', '$state', 'TeamChannelService', 'SvUtilsService', 'TeamMemberService', 'TeamChannelHelperService','UserService',
      function($rootScope, $scope, $stateParams, $state, TeamChannelService, SvUtilsService, TeamMemberService, TeamChannelHelperService, UserService) {
        var previousSelected;
        // bind variables to scope.
        $scope.teamMemberHash = UserService.getTeamMemberHash();
        $scope.teamMembers = UserService.getTeamMembers();
        $scope.mychannels = ng.copy(UserService.getMyChannels());

        // instantiate TeamChannelHelperService
        $scope.TCH = new TeamChannelHelperService({
          srcCollection: $scope.teamMembers.map(function(item,index){
            item.order = index;
            return item;
          })
        });

        /**
         * get member list from server.
         *
         * @param {Object} channel
         */
        $scope.getMemberDropdownList = function(channel) {
          if (!channel) {
            return;
          }

          // get members.
          TeamChannelService.getMembers({
            id: channel.key
          }, function(channelAllowedMembers) {
            $scope.TCH.rebuildAllowed(channel, channelAllowedMembers);
            $scope.TCH.rebuildAvailable(channel);
          }, function(err) {
            alert('getMembers failed');
          });
        };

        /**
         * Select tab changes previousSelected 's value.
         *
         * @param {Object} channel
         */
        $scope.tabSelected = function(channel) {
          $scope.isNewChannel = false;
          if(previousSelected){
            previousSelected.isSelected = false;
          }
          channel.isSelected = true;
          previousSelected = channel;
          $scope.getMemberDropdownList(channel);
        };

        /**
         * If we have channles we select the first one on instantation.
         */
        if ($scope.mychannels.length > 0) {
          $scope.tabSelected($scope.mychannels[0]);
        }

        /**
         * NOOP
         */
        $scope.testConnection = function() {
          alert('tested connection');
        };

        /**
         * Reset channel model.
         */
        function resetChannel() {
          $scope.newChannel = {
            name : null,
            assignedTeamKey: UserService.getUser().teamKey
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
          resetChannel();
          resetLastSelected();
          $scope.isNewChannel = true;
        };

        /**
         * Create new channel of save current one with new details.
         *
         * @param {Object} channel
         */
        $scope.saveChannel = function(channel) {
          console.log('channel:' , channel);
          if (!$scope.key) {
            // create new channel
            TeamChannelService.save({}, channel, (function(chan) {
              resetChannel();
              $scope.addMember(chan, UserService.getUser());
              $scope.mychannels.push(chan);
              $scope.tabSelected(chan);
            }), function(err) {
              alert('Add channel failed');
            });
          } else {
            // save channel with new details.
            TeamChannelService.update({
              id: channel.key
            }, _.pick(channel, ['name','assignedTeamKey']), (function(data) {
              channel.displayEditChannel = false;
            }), function(err) {
              alert('Update channel failed');
            });
          }
        };

        /**
         * Toggle channel activity.
         *
         * @param channel
         */
        $scope.toggleactivechannel = function(channel) {
          channel.status = channel.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';

          // update channel's activity on server.
          TeamChannelService.update({
            id: channel.key
          }, _.pick(channel, ['name','assignedTeamKey','status']), (function(data) {
            console.log('channel activated/deactivated successfully');
            channel = data;
            $rootScope.$emit('event:mychannelsmodified', $scope.mychannels);
          }), function(err) {
            alert('Update channel failed');
          });
        };

        /**
         * Delete a channel (by deactvating it)
         *
         * @param {Object} channel
         */
        $scope.deleteChannel = function(channel) {
          if (confirm('Delete this channel?')) {
            console.log('deleting channel');
            // remove a channel.
            channel.$remove({
              id: channel.key
            }, (function(data) {
              $rootScope.$emit('event:mychannelsmodified', $scope.mychannels);
              console.log('delete successful', data);
            }), function(data) {
              console.error('error deleting channel:', data);
            });
          }
        };

        /**
         * set displayEditChannel true to open edit channel window
         *
         * @param {Object} channel
         */
        $scope.editChannel = function(channel) {
          channel.displayEditChannel = true;
        };

        /**
         * set displayEditChannel false to close edit channel window
         *
         * @param channel
         */
        $scope.cancelEditChannel = function(channel) {
          channel.displayEditChannel = false;
        };

        /**
         * Remove member from channel
         *
         * @param {Object} channel
         * @param {Object} member
         * @returns {boolean}
         */
        $scope.removeMember = function(channel, member) {
          if (member.key === UserService.getUser().key) {
            console.log('You are not allowed to remove channels from yourself');
            return false;
          }

          var index = SvUtilsService.indexOf($scope.teamMembers, member.key, 'key');
          if(index > -1) {
            member.order = index;
          }

          $scope.TCH.remove(channel, member);
          TeamChannelService.removeMember({
            id: channel.key,
            userKey: member.key
          }, function() { });
        };

        /**
         * Add member to channel
         *
         * @param {Object} channel
         * @param {Object} member
         */
        $scope.addMember = function(channel, member) {
          $scope.TCH.add(channel, member);
          TeamChannelService.addMember({
            id: channel.key,
            userKey: member.key
          }, function() { });
        };
      }
    ])

})(angular);