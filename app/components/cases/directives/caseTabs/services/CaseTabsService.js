'use strict';

/**
 * This is singletone service that holds all current tabs
 */
(function(ng) {
  ng.module('supportVine')
    .service('CaseTabsService', [
      '$state', '$stateParams', 'SessionService', 'SvUtilsService',
      function($state, $stateParams, SessionService, SvUtilsService) {

        /**
         * Case tab class
         * @param {Object} collection
         * @constructor
         */
        function CaseTabsService(collection) {
          this.sessionName = 'caseTabs';
          this.collection = [];
          this.restore();
        }

        /**
         * Restore saved tabs from local storage
         * @returns {Array}
         */
        CaseTabsService.prototype.restore = function() {
          var i, l, saved, _results;
          saved = SessionService.get(this.sessionName);
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
         * Saves case tabs to local storage
         *
         * @returns {*}
         */
        CaseTabsService.prototype.save = function() {
          return SessionService.set(this.sessionName, this.collection);
        };

        /**
         * Add a case to case tab
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
         * Update a certain case
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
         * Remove a certain case
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
         * Clear all tabs including saved in local storage
         *
         * @returns {*}
         */
        CaseTabsService.prototype.clear = function() {
          this.collection = [];
          return this.save();
        };

        /**
         * Get a certain item from collection
         * @param {String} item
         * @returns {*}
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
         * Check if any of the tabs as active property true
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
         * Set a certain case as active.
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
         * @returns {Number|false}
         */
        CaseTabsService.prototype.getCurrent = function() {
          return this.getIndex({key : $stateParams.key});
        };

        /**
         * Get an index of a case
         * @param {Object} item
         * @returns {*}
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

        // instantiate case tab service
        return new CaseTabsService();
      }
    ]);

})(angular);