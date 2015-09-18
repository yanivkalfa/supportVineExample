'use strict';

/**
 * sv live api service
 */
(function(ng) {
  ng.module('supportVine')
    .factory('SvLiveApiService', [
      '$auth','NgStompService', 'NotificationsChannelService', '$q', 'ENV',
      function($auth, NgStompService, NotificationsChannelService, $q, ENV) {
        var connected, self, stompClient, stompEndpoint, _addMemberToNotifications, _connect, _disconnect, _isLive, _send, _start, _streamUnseenNotifications, token;

        // getting token from auth service
        token = $auth.getToken() || '';
        stompEndpoint = '' + ENV.serverUrl + '/supportvine/ws?access_token='+token;
        // instantiating ngStomp
        stompClient = NgStompService(stompEndpoint);
        connected = false;

        /**
         * subscribing to notification channel
         *
         * @param {String} memberKey
         * @returns {*|{id, unsubscribe}}
         * @private
         */
        _addMemberToNotifications = function(memberKey) {
          return stompClient.subscribe('/topic/notifications.' + memberKey, function(message) {
            return NotificationsChannelService.notify(JSON.parse(message.body));
          });
        };

        /**
         * Connect user to server
         *
         * @returns {promise}
         * @private
         */
        _connect = function() {
          var deferred;
          deferred = $q.defer();
          stompClient.connect(
            function(frame) {
              connected = true;
              deferred.resolve(frame);
            },
            function(error) {
              deferred.reject(error);
            }
          );
          return deferred.promise;
        };

        /**
         * alias of connection no idea why this was even created.
         *
         * @returns {promise}
         * @private
         */
        _start = function() {
          return _connect();
        };

        /**
         * Disconnect user from server
         *
         * @returns {void|*}
         * @private
         */
        _disconnect = function() {
          return stompClient.disconnect(function() {
            return connected = false;
          });
        };

        /**
         * Checks if we are connected
         * @returns {boolean}
         * @private
         */
        _isLive = function() {
          return connected;
        };

        /**
         * Broadcast a message to a certain channel
         *
         * @param {String} destination
         * @param {Object} headers
         * @param {*} payload
         * @returns {boolean}
         * @private
         */
        _send = function(destination, headers, payload) {
          if (!_isLive()) {
            return false;
          }
          stompClient.send(destination, headers, payload);
          return true;
        };

        /**
         * Uses _send to notify unseen notification
         *
         * @param {String} memberKey
         * @returns {boolean}
         * @private
         */
        _streamUnseenNotifications = function(memberKey) {
          return _send('/app/members/' + memberKey + '/notifications/stream/unseen', {}, {
            dummy: true
          });
        };

        // exposing what we want to expose
        return {
          start: _start,
          disconnect: _disconnect,
          streamUnseenNotifications: _streamUnseenNotifications,
          addMemberToNotificationsChannel: _addMemberToNotifications,
          isLive: _isLive
        };
      }
    ]);

})(angular);