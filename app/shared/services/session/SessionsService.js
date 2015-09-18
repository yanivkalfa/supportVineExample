'use strict';

(function(ng) {

  /*
   * @description
   * # Exposes 3 method to manipulate localStorage - while keeping values types (number will stay number)
   *
   * @ngdoc factory
   * @name supportVineApp.SessionService
   */
  ng.module('supportVine')
    .factory('SessionService', function() {
      return {

        /*
         * @description
         * # Set storage
         *
         * @param key {String}
         * @param value {unknown}
         * @returns {boolean}
         *
         */
        set: function(key, value) {
          var e;
          try {
            localStorage.setItem(key, JSON.stringify(value));
          } catch (_error) {
            e = _error;
            throw new Error('The following error has occurred: ' + e);
          }
          return true;
        },

        /*
         * @description
         * # Get Storage
         *
         * @param key {String}
         * @returns {undefined|value}
         */
        get: function(key) {
          var e, value;
          value = void 0;
          try {
            value = JSON.parse(localStorage.getItem(key));
          } catch (_error) {
            e = _error;
            throw new Error('The following error has occurred: ' + e);
          }
          return value;
        },

        /*
         * @description
         * # Remove storage {String}
         *
         * @param key
         * @returns {boolean}
         */
        remove: function(key) {
          var e;
          try {
            localStorage.removeItem(key);
          } catch (_error) {
            e = _error;
            throw new Error('The following error has occurred: ' + e);
          }
          return true;
        }
      };
    });

})(angular);
