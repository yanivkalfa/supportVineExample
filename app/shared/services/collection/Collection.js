'use strict';

/**
 * collection service is a fancy array that has helper method to manipulate its content
 */
(function(ng) {
  ng.module('supportVine')
    .factory('CollectionService', function() {

      /**
       * Collectionc lass
       *
       * @param {Object} collection
       * @constructor
       */
      function Collection(collection) {
        this.collection = collection || [];
      }

      /**
       * add item to this.colleciton
       *
       * @param {Object}item
       * @returns {boolean}
       */
      Collection.prototype.add = function(item) {
        this.collection.push(item);
        return true;
      };

      /**
       * update item in the list
       *
       * @param {Number} index
       * @param {Object} item
       * @returns {boolean}
       */
      Collection.prototype.update = function(index, item) {
        if (index <= -1) {
          return false;
        }
        this.collection[index] = item;
        return true;
      };

      /**
       * Remove item from the list
       * @param {Object} index
       * @returns {boolean}
       */
      Collection.prototype.remove = function(index) {
        if (index <= -1) {
          return false;
        }
        this.collection.splice(index, 1);
        return true;
      };

      /**
       * Clear list completley.
       * @returns {Array}
       */
      Collection.prototype.clear = function() {
        return this.collection = [];
      };

      /**
       * Get item from list
       *
       * @param {Number} index
       * @returns {*}
       */
      Collection.prototype.get = function(index) {
        if (!index) {
          return this.collection;
        }
        if (index === -1) {
          return false;
        }
        return this.collection[index];
      };

      return Collection;
    });

})(angular);
