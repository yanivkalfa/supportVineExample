'use strict';

/**
 * Stomp Service(web sockets service)
 */
(function(ng) {
  ng.module('supportVine')
    .factory('NgStompService', ['$rootScope', function($rootScope) {
      var stompClient;
      stompClient = {};

      /**
       * NgStorm constractor instantiating SockJs
       *
       * @param {String} url
       * @constructor
       */
      function NgStomp(url) {
        var ws;
        ws = new SockJS(url);
        this.stompClient = window.Stomp.over(ws);
        this.stompClient.debug = function(message) {
          return message;
        };
      }

      /**
       * Subscribing to a channel
       *
       * @param {String} queue
       * @param {Function} callback
       */
      NgStomp.prototype.subscribe = function(queue, callback) {
        this.stompClient.subscribe(queue, function() {
          var args;
          args = arguments;
          $rootScope.$apply(function() {
            callback(args[0]);
          });
        });
      };

      /**
       * Broadcast to a queue
       *
       * @param {String} queue
       * @param {Array} headers
       * @param {*} data
       */
      NgStomp.prototype.send = function(queue, headers, data) {
        this.stompClient.send(queue, headers, data);
      };

      /**
       * Connect to the server
       *
       * @param {Function} on_connect
       * @param {Function} on_error
       * @param {String} vhost
       */
      NgStomp.prototype.connect = function(on_connect, on_error, vhost) {
        this.stompClient.connect({},
          function(frame) {
            $rootScope.$apply(function() {
              on_connect.call(stompClient, frame);
            });
          },
          function(frame) {
            $rootScope.$apply(function() {
              on_error.call(stompClient, frame);
            });
          }
        );
      };

      /**
       * Disconnect from the server
       * @param {Function} callback
       */
      NgStomp.prototype.disconnect = function(callback) {
        this.stompClient.disconnect(callback);
      };

      // returning an instance of the service
      return function(url) {
        return new NgStomp(url);
      };
    }]
  );

})(angular);