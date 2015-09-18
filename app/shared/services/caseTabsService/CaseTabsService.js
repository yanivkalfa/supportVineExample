'use strict';

/**
 * Case tab service (the ones appear horizontally)
 *
 */
(function(ng) {
  ng.module('supportVine')
    .service('CaseTabsService', [
      '$state', '$stateParams', 'Session', 'SvUtilsService',
      function($state, $stateParams, Session, SvUtilsService) {

        /**
         * Case tab class that manipulate list, while syncing with local storage
         *
         * @param {Object} collection
         * @constructor
         */
        function CaseTabsService(collection) {
          this.sessionName = 'caseTabs';
          this.collection = [];
          this.restore();
        }

        /**
         * restore this.collection from local storage
         *
         * @returns {Array}
         */
        CaseTabsService.prototype.restore = function() {
          var i, l, saved, _results;
          saved = Session.get(this.sessionName);
          this.collection = ng.isArray(saved) ? saved : [];
          i = 0;
          l = this.collection.length;
          _results = [];
          while (i < l) {
            this.collection[i].active = false;
            _results.push(i++);
          }
          return _results;
        };

        /**
         * Save this.collection to local storage
         *
         * @returns {*}
         */
        CaseTabsService.prototype.save = function() {
          return Session.set(this.sessionName, this.collection);
        };

        /**
         * add case to tab list
         *
         * @param {Object} caze
         * @param {String} msgKey
         * @returns {boolean}
         */
        CaseTabsService.prototype.add = function(caze, msgKey) {
          var caseTab, index;
          caseTab = {
            key: caze.key,
            title: caze.title,
            number: caze.caseNumber,
            active: false
          };
          index = this.getIndex(caseTab);
          if (index <= -1) {
            this.collection.push(caseTab);
            this.save();
          }
          $state.go('landing.cases.detail', {
            key: caze.key,
            msgKey: msgKey || null
          });
          return true;
        };

        /**
         * Update case in the list
         *
         * @param {Object} item
         * @returns {boolean}
         */
        CaseTabsService.prototype.update = function(item) {
          var index, active;

          index = this.getIndex(item);
          if (index <= -1) {
            return false;
          }

          // storing active value
          active = this.collection[index].active;
          // setting new values
          this.collection[index] = item;
          // restoring active mode
          this.collection[index].active = active;
          this.save();
          return true;
        };

        /**
         * Remove case from tab list
         *
         * @param {Object} item
         * @returns {boolean}
         */
        CaseTabsService.prototype.remove = function(item) {
          var index, current;
          index = this.collection.indexOf(item);
          if (index <= -1) {
            return false;
          }

          current = this.getCurrent();
          this.collection.splice(index, 1);
          this.save();
          if(current === index){
            $state.go('landing.cases.list');
          }
          return true;
        };

        /**
         * Clear all tabs both local storage and in this.collection
         *
         * @returns {*}
         */
        CaseTabsService.prototype.clear = function() {
          this.collection = [];
          return this.save();
        };

        /**
         * Get a certain case
         *
         * @param {Object} item
         * @returns {Object || false}
         */
        CaseTabsService.prototype.get = function(item) {
          var index;
          index = this.getIndex(item);
          if (!item) {
            return this.collection;
          }
          if (index <= -1) {
            return false;
          }
          return this.collection[index];
        };

        /**
         * Check if any of the tab case is active
         *
         * @returns {boolean}
         */
        CaseTabsService.prototype.hasActive = function() {
          var hasActive, i, l;
          hasActive = false;
          i = 0;
          l = this.collection.length;
          while (i < l) {
            if (this.collection[i].active) {
              hasActive = true;
            }
            i++;
          }
          return hasActive;
        };

        /**
         * Clear the active on all case and
         * then set a specific case as the active case
         *
         * @param {String} tabKey
         * @returns {boolean}
         */
        CaseTabsService.prototype.setActiveTab = function(tabKey){
          this.restore();
          var index, tabs;
          index = this.getIndex({key:tabKey});
          if (index <= -1) {
            return;
          }
          tabs = this.get();
          _.forEach(tabs, function(tab) {
            tab.active = false;
          });
          return this.get()[index].active = true;
        };

        /**
         * Get current case
         *
         * @returns current case
         */
        CaseTabsService.prototype.getCurrent = function() {
          return this.getIndex({key : $stateParams.key});
        };

        /**
         * get case index
         *
         * @param {Object} item
         * @returns {Number || false}
         */
        CaseTabsService.prototype.getIndex = function(item) {
          var index;
          item = item || {};
          index = this.collection.indexOf(item);
          if (index <= -1) {
            return SvUtilsService.lookupIndex(this.collection, 'key', item.key);
          } else {
            return index;
          }
        };

        // instantiate CaseTabsService
        return new CaseTabsService();
      }
    ]);

})(angular);
