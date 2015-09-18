'use strict';

/**
 * collection service is a fancy array that has helper method to manipulate its content
 * Unlike collection.js this is a little more advanced and doesnt only work on reference
 * will also work on a certain predefined unique key
 */

(function(ng) {
  ng.module('supportVine')
    .factory('Collection', [
      'SvUtilsService',
      function (SvUtilsService) {

        /**
         * collection class
         *
         * @param {Object} opts
         * @constructor
         */
        function Collection(opts) {
          opts = opts || {};
          this._unique = opts.unique || false;
          this._prop = opts.prop || undefined;
          this.collection = opts.collection || [];
        }

        /**
         * add item to collection
         *
         * @param {Object} item
         * @param {String} prop - optional
         * @returns {Object || false}
         */
        Collection.prototype.add = function (item, prop) {
          if (this._unique) {
            var index = this.indexOf(item, prop || this._prop);
            if (index > -1) {
              return false;
            }
          }
          return this.collection.push(item);
        };

        /**
         * Update item in the collection
         *
         * @param {Object} item
         * @param {String} prop optional
         * @returns {Object || false}
         */
        Collection.prototype.update = function (item, prop) {
          var index = this.indexOf(item, prop || this._prop);
          if (index <= -1) {
            return false;
          }
          this.collection[index] = item;
          return this.collection[index];
        };

        /**
         * Remove item from the collection
         *
         * @param {Object} item
         * @param {String} prop optional
         * @returns {Number | false}
         */
        Collection.prototype.remove = function (item, prop) {
          var index = this.indexOf(item, prop || this._prop);
          if (index <= -1) {
            return false;
          }
          return this.collection.splice(index, 1);
        };

        /**
         * Clear collection
         *
         */
        Collection.prototype.clear = function () {
          this.collection.splice(0, this.collection.length);
        };

        /**
         * Set collection used in-case we want to use reference
         *
         * @param {Object} newCollection
         * @returns {Array}
         */
        Collection.prototype.set = function (newCollection) {
          if (!Array.isArray(newCollection)) {
            return false;
          }
          this.clear();
          var i, l;
          i = 0;
          l = newCollection.length;
          for (i; i < l; i++) {
            this.add(newCollection[i]);
          }

          return this.collection;
        };

        /**
         * Get Item from the collection
         *
         * @param {Object} item
         * @param {String} prop
         * @returns {Object||false}
         */
        Collection.prototype.get = function (item, prop) {
          if (!item) {
            return this.collection;
          }
          var index = this.indexOf(item, prop || this._prop);
          if (index <= -1) {
            return false;
          }
          return this.collection[index];
        };

        /**
         * Find the index of an item in the collection
         *
         * @param {Object} item
         * @param {String} prop
         * @returns {Number||false}
         */
        Collection.prototype.indexOf = function (item, prop) {
          if (!item) {
            return false;
          }
          if (prop) {
            return SvUtilsService.indexOf(this.collection, item, prop);
          }
          return this.collection.indexOf(item);
        };

        return Collection;
      }
    ]);
})(angular);
