'use strict';


/**
 * Service that is use with most case related functionality.
 * also holds current case.
 */
(function(ng) {
  ng.module('supportVine')
    .factory('CaseHelperService', [
      '$q','$modal', 'ENUM', 'CaseService','UserService','CaseTabsService',
      function($q, $modal, ENUM, CaseService, UserService, CaseTabsService) {

        /**
         * Holds current case
         *
         * @type {{Object}}
         * @private
         */
        var _current = {};

        /**
         * Holds the acceptable fields - used in _.pick
         *
         * @type {string[]}
         * @private
         */
        var _caseFields = [
          'browserData','caseNumber','caseStatus',
          'caseTypesKeys','channelKey','title',
          'description','key','assignedUsers',
          'totalValue','createDate','updateDate'
        ];

        /**
         * Set current case
         *
         * @param {Object} caze
         */
        function setCurrent(caze){
          _current = caze;
        }

        /**
         * Get current case
         *
         * @returns {{Object}}
         */
        function getCurrent(){
          return _current;
        }

        /**
         * Creates new case from the supplied fields
         *
         * @param {Object} caze
         * @returns Promise
         */
        function create(caze){
          return CaseService.create(_.pick(caze,_caseFields)).$promise;
        }

        /**
         * Update case with the supplied fields
         *
         * @param {Object} caze
         * @returns Promise
         */
        function update(caze){
          return CaseService.update(_.pick(caze,_caseFields)).$promise;
        }

        /**
         * Get case type key by case type.
         *
         * @param {String} caseType
         * @returns {String} case key.
         */
        function getType(caseType){
          return ENUM.caseTypes[caseType] ? ENUM.caseTypes[caseType] : false;
        }

        function setStatus(caze, status) {
          caze.caseStatus = status;
          return update(caze);
        }

        /**
         * Pines case to certain user
         *
         * @param {Boolean} addPin
         * @param {Object} caze
         * @return promise
         */
        function pinCase(addPin, caze) {
          return addPin ? UserService.pinCase(caze) : UserService.unpinCase(caze);
        }

        /**
         * Opens modal window and handles create case update case
         *
         * @param {Object} caze
         */
        function openCreateCaseModal(caze) {
          var modalInstance;
          modalInstance = $modal.open({
            templateUrl: 'components/cases/views/EditCaseModalView.html',
            controller: 'CaseModalCtrl',
            backdrop : 'static',
            resolve: {
              caze: function() {
                return caze;
              },
              ENUM: function() {
                return ENUM;
              }
            }
          });
          modalInstance.result.then((function(caze) {
            if (caze.key) {
              // Case  has key = not new case - so we are updating.
              update(caze).then(function(responseCase){
                // We are updating the uset pinned cases
                UserService.getUserPinnedCases(caze);
                // And updating the case tab service.
                CaseTabsService.update(caze);
              });
            } else {
              // no key = new case - creating new case.
              create(caze).then(
                function(newCase){
                  // Adding created case to case tab service.
                  CaseTabsService.add(newCase);
                },
                function(data){
                  console.log('Error: ', data);
                }
              );
            }
          }), function() {
            console.log('Modal dismissed at: ' + new Date());
          });
        }

        /**
         * Exposing methods we like to expose.
         */
        return {
          create : create,
          update : update,
          pinCase : pinCase,
          getType : getType,
          setStatus : setStatus,
          setCurrent : setCurrent,
          getCurrent : getCurrent,
          openCreateCaseModal : openCreateCaseModal
        }
      }
    ]);

})(angular);