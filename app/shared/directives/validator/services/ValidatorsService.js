'use strict';

/**
 * Specific validator
 */
(function(ng) {
  ng.module('supportVine')
    .factory('ValidatorsService', function() {
      return {
        // validate against a minimum value.
        min: function(value, min) {
          return ('' + value).length >= min;
        },

        // validate against maximum value.
        max: function(value, max) {
          return ('' + value).length <= max;
        },

        // make sure value is less then a certain value
        less: function(value, max) {
          return (value * 1) < max;
        },

        // make sure value is more then a certain value
        greater: function(value, min) {
          return (value * 1) > min;
        },

        // validate that value is a date
        date: function(value) {
          return /^[0-1][0-9]\/[0-3][0-9]\/[1-2][0-9][0-9][0-9]$/.test(value);
        },

        // validate that a value is a phone number
        phone: function(value) {
          return /^\d{3}\-\d{3}\-\d{4}$/.test(value);
        },

        // validated that a value is a zip code
        zip: function(value) {
          return /^\d{5}$/.test(value);
        },

        // validate that a value is a social security number
        ssn: function(value) {
          return /^\d{3}\-\d{2}\-\d{4}$/.test(value);
        },

        // validate that a value is alpha numeric
        alpha: function(value) {
          return /^[a-zA-Z]+$/.test(value);
        },

        // compare one value to another (like 2 passwords)
        compareTo: function(value, value2) {
          return ('' + value) === ('' + value2);
        },

        // validate a credit card number
        luhnCheck: function(str) {
          var counter, i, incNum, luhnArr, odd, something, temp;
          luhnArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
          counter = 0;
          odd = false;
          temp = String(str).replace(/[^\d]/g, "");
          if (temp.length === 0 || temp.length < 14) {
            return false;
          }
          i = temp.length - 1;
          while (i >= 0) {
            incNum = parseInt(temp.charAt(i), 10);
            something = (odd = !odd) ? incNum : luhnArr[incNum];
            counter += something;
            i--;
          }
          return counter % 10 === 0;
        }
      };
    });

})(angular);