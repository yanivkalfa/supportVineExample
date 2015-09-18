'use strict';

/**
 * team channel helper service
 *
 */
(function(ng) {
  ng.module('supportVine')
    .factory('TeamChannelHelperService', [
      'CollectionService', 'SvUtilsService',
      function(CollectionService, SvUtilsService) {


        /**
         * TeamChannelHelper constructor
         *
         * @param {Object} opts
         * @constructor
         */
        function TeamChannelHelper(opts) {
          this.srcCollection = new CollectionService(opts.srcCollection || []);
          this.available = new CollectionService(opts.available || []);
        }

        /**
         * searches an item in the collection
         *
         * @param {Object} obj
         * @returns {Object || false}
         */
        TeamChannelHelper.prototype.searchSrc = function(obj) {
          var index;
          index = SvUtilsService.lookupIndex(this.srcCollection.collection, 'key', obj.key);
          if (index === -1) {
            return false;
          }
          return this.srcCollection.collection[index];
        };

        /**
         * Rebuild building allow collection
         *
         * @param {Object} item
         * @param {Array} respAllowed
         */
        TeamChannelHelper.prototype.rebuildAllowed = function(item, respAllowed) {
          var allowedCollection, i, index, l;
          item.allowed = item.allowed || new CollectionService;
          i = 0;
          l = respAllowed.length;
          while (i < l) {
            index = SvUtilsService.lookupIndex(item.allowed.get(), 'key', respAllowed[i].key);
            if (index === -1 && respAllowed[i]) {
              item.allowed.add(respAllowed[i]);
            }
            i++;
          }
          allowedCollection = item.allowed.get();
          i = 0;
          l = allowedCollection.length;
          while (i < l) {
            index = SvUtilsService.lookupIndex(respAllowed, 'key', allowedCollection[i].key);
            if (index === -1) {
              item.allowed.remove(i);
              l--;
            }
            i++;
          }
        };

        /**
         * Rebuild available collection.
         *
         * @param {Object} item
         */
        TeamChannelHelper.prototype.rebuildAvailable = function(item) {
          var i, index, l, srcCollection;
          srcCollection = this.srcCollection.get();
          this.available.clear();
          i = 0;
          l = srcCollection.length;
          while (i < l) {
            index = SvUtilsService.lookupIndex(item.allowed.get(), 'key', srcCollection[i].key);
            if (index === -1 && srcCollection[i]) {
              this.available.add(srcCollection[i]);
            }
            i++;
          }
        };

        /**
         * remove item from collection
         *
         * @param {Object} item
         * @param {Object} toRemove
         * @returns {*}
         */
        TeamChannelHelper.prototype.remove = function(item, toRemove) {
          var index;
          index = SvUtilsService.lookupIndex(item.allowed.get(), 'key', toRemove.key);
          if (index === -1) {
            return false;
          }
          item.allowed.remove(index);
          return this.available.add(toRemove);
        };

        /**
         * add item to a collection
         *
         * @param {Object} item
         * @param {Object} toAdd
         * @returns {*}
         */
        TeamChannelHelper.prototype.add = function(item, toAdd) {
          var index;
          index = SvUtilsService.lookupIndex(this.available.get(), 'key', toAdd.key);
          if (index === -1) {
            return false;
          }
          this.available.remove(index);
          return item.allowed.add(toAdd);
        };

        return TeamChannelHelper;
      }
    ]);

})(angular);