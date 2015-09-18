'use strict';

/**
 * Pinned case channel service
 *
 */
(function(ng) {
  ng.module('supportVine')
    .factory('PinnedCasesChannelService', [
      '$rootScope', function($rootScope) {
        var CLEAR_PINNED_CASES_MESSAGE, PINNED_CASE_MESSAGE, UNPINNED_CASE_MESSAGE, clearPinnedCases, onClearPinnedCases, onPinCase, onUnpinCase, pinCase, unpinCase;
        PINNED_CASE_MESSAGE = 'pinnedCaseMessage';
        UNPINNED_CASE_MESSAGE = 'unpinnedCaseMessage';
        CLEAR_PINNED_CASES_MESSAGE = 'clearPinnedCasesMessage';

        /**
         * Broadcast pinned case to subscribers
         * @param {String} caseKey
         */
        pinCase = function(caseKey) {
          $rootScope.$broadcast(PINNED_CASE_MESSAGE, {
            caseKey: caseKey
          });
        };

        /**
         * Broadcast unpin case to subscribers
         * @param {String} caseKey
         */
        unpinCase = function(caseKey) {
          $rootScope.$broadcast(UNPINNED_CASE_MESSAGE, {
            caseKey: caseKey
          });
        };

        /**
         * broadcast clear pinned cases to subscriber
         */
        clearPinnedCases = function() {
          $rootScope.$broadcast(CLEAR_PINNED_CASES_MESSAGE);
        };

        /**
         * Subscribe current user to pinned cases
         *
         * @param {Object} $scope
         * @param {Function} handler
         */
        onPinCase = function($scope, handler) {
          $scope.$on(PINNED_CASE_MESSAGE, function(event, message) {
            handler(message.caseKey);
          });
        };

        /**
         * Subscribe current user to unpin case
         *
         * @param {Object} $scope
         * @param {Function} handler
         */
        onUnpinCase = function($scope, handler) {
          $scope.$on(UNPINNED_CASE_MESSAGE, function(event, message) {
            handler(message.caseKey);
          });
        };

        /**
         * Subscribe to current user for pinned cases
         *
         * @param {Object} $scope
         * @param {Function} handler
         */
        onClearPinnedCases = function($scope, handler) {
          $scope.$on(CLEAR_PINNED_CASES_MESSAGE, function(event, message) {
            handler();
          });
        };

        // explose what
        return {
          pinCase: pinCase,
          unpinCase: unpinCase,
          clearPinnedCases: clearPinnedCases,
          onPinCase: onPinCase,
          onUnpinCase: onUnpinCase,
          onClearPinnedCases: onClearPinnedCases
        };
      }
    ]);

})(angular);