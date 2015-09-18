'use strict';

/**
 * User signletone service hold information about user and other user manipulation actions.
 */
(function(ng) {
  ng.module('supportVine')
    .service('UserService', [
      '$q', 'TeamMemberService', 'SvUtilsService', 'TeamChannelService', 'NotificationsChannelService',
      function($q, TeamMemberService, SvUtilsService, TeamChannelService, NotificationsChannelService) {

        /**
         * Get current member details
         *
         * @returns {promise}
         */
        function getAuthenticatedMember(){
          return TeamMemberService.getAuthenticatedMember({}).$promise;
        }

        /**
         * Get current user channels
         *
         * @param user
         * @returns {promise}
         */
        function getMemberTeam(user){
          return TeamMemberService.query({ id: user.teamKey }).$promise;
        }

        /**
         * Get current user channels
         *
         * @param user
         * @returns {promise}
         */
        function getMyChannels(user){
          return TeamChannelService.query({ userKey: user.key }).$promise;
        }

        /**
         * Singletone user service class
         *
         * @constructor
         */
        function UserService(){
          this._user = null;
          this._teamMembers = null;
          this._teamMemberHash = null;
          this._myChannels = null;
          this.initBusy = false;
        }

        /**
         * init user service - invoked as the resolve of landing page
         *
         * @returns {promise}
         */
        UserService.prototype.init = function(){
          var deferred, self, qAll = [];
          deferred = $q.defer();
          self = this;

          if(this.initBusy) {
            deferred.resolve(self);
            return deferred.promise;
          }
          this.initBusy = true;
          getAuthenticatedMember().then(function(user){
            qAll.push(getMemberTeam(user));
            qAll.push(getMyChannels(user));
            $q.all(qAll).then(function(result){
              self._user = user;
              self._teamMembers = result[0];
              self._myChannels = result[1];
              self.updateTeamMemberHash();
              self.getUserPinnedCases();
              self.initBusy = false;
              deferred.resolve(self);
            }).catch(function(){deferred.reject("100001")});
          }).catch(function(){deferred.reject("100001")});
          return deferred.promise;
        };

        /**
         * used to get current user
         *
         * @returns {null|Object}
         */
        UserService.prototype.getUser = function(){
          return this._user;
        };

        /**
         * used to get current user pinned cases
         *
         * @returns {Array}
         */
        UserService.prototype.getPinnedCases = function(){
          return this._user.pinnedCases;
        };

        /**
         * used to get current user team members
         *
         * @returns {Array}
         */
        UserService.prototype.getTeamMembers = function(){
          return this._teamMembers;
        };

        /**
         * Get teamMemberHash
         *
         * @returns {null|Object}
         */
        UserService.prototype.getTeamMemberHash = function(){
          return this._teamMemberHash;
        };

        /**
         * get current user channel
         *
         * @returns {Array}
         */
        UserService.prototype.getMyChannels = function(){
          return this._myChannels;
        };

        /**
         * check if a user has access
         *
         * @param {String} roles // mpt used yet.
         * @returns {boolean}
         */
        UserService.prototype.userCanAccess = function(roles){
          // todo change this to proper ACL.
          return Boolean(this.getUser().admin);
        };

        /**
         * unpine case - remove it from user's pin list
         *
         * @param {Object} caze
         * @returns {promise}
         */
        UserService.prototype.unpinCase = function(caze){
          var id = caze.key;
          var memberId = this.getUser().key;
          return TeamMemberService.removePinnedCase({id: id, memberId: memberId }, {}).$promise;
        };

        /**
         * pin case - add it from user's pin list
         *
         * @param {Object} caze
         * @returns {promise}
         */
        UserService.prototype.pinCase = function(caze){
          var id = caze.key;
          var memberId = this.getUser().key;
          return TeamMemberService.addPinnedCase({ id: id, memberId: memberId }, {}).$promise;
        };

        /**
         * when unpine happened we remove it from pinned case list
         *
         * @param {Object} caze
         * @returns {boolean}
         */
        UserService.prototype.onUnpinCase = function(caze){
          var index, user;
          user = this.getUser();
          index = SvUtilsService.lookupIndex(user.pinnedCases, 'key', caze.key);
          if (index === -1) {
            return false;
          }
          user.pinnedCases.splice(index, 1);
        };

        /**
         * when pin happened we add it from pinned case list
         *
         * @param {Object} caze
         * @returns {boolean}
         */
        UserService.prototype.onPinCase = function(caze){
          var user = this.getUser();
          user.pinnedCases.push(caze);
        };

        /**
         * Will clear user's pinned cases completley
         *
         * @returns {promise}
         */
        UserService.prototype.clearPinnedCases = function(){
          return TeamMemberService.clearPinnedCases({ memberId: this.getUser().key }).$promise;
        };

        /**
         * Get user pinned cases from server
         *
         * @returns {promise}
         */
        UserService.prototype.getUserPinnedCases = function(){
          var user = this.getUser();
          return TeamMemberService.getPinnedCases({ memberId: user.key }, function(pinnedCases){
            user.pinnedCases = pinnedCases;
          }).$promise;
        };

        /**
         * check if case is pinned
         *
         * @param {Object} caze
         * @returns {boolean}
         */
        UserService.prototype.isCasePinned = function(caze){
          var user = this.getUser();
          return Boolean(SvUtilsService.lookupIndex(user.pinnedCases, 'key', caze.key) > -1)
        };

        /**
         * will set/update teamMemberHash from teamMember
         *
         * @returns {Object} teamMemberHash or null
         */
        UserService.prototype.updateTeamMemberHash = function(){
          var i, l, teamMembers;
          teamMembers = this.getTeamMembers();
          this._teamMemberHash = {};
          i = 0;
          l = teamMembers.length;
          for(i;i<l; i++){
            this._teamMemberHash[teamMembers[i].key] = teamMembers[i];
          }
          return this._teamMemberHash;
        };

        /**
         * get all user notification and map / broadcast them using NotificationsChannelService
         *
         * @returns {promise}
         */
        UserService.prototype.getUserNotifications = function(){
          return TeamMemberService.getNotifications({
            memberId: this.getUser().key
          }).$promise.then(function(notifications) {
              notifications.map(function(notification) {
                NotificationsChannelService.notify(notification);
              });
            });
        };

        /**
         * Reset the class
         */
        UserService.prototype.destroy = function(){
          this._user = null;
          this._teamMembers = null;
          this._teamMemberHash = null;
          this._myChannels = null;
        };

        // instantiate UserService
        return new UserService();
      }]);
})(angular);