'use strict';

/**
 * REST Billing resource
 */
(function(ng) {
  var billingCardServiceUrl, billingCustomerServiceUrl, tokenServiceUrl;
  billingCustomerServiceUrl = 'https://api.stripe.com/v1/customers/:customerId';
  billingCardServiceUrl = 'https://api.stripe.com/v1/customsers/:customerId/cards/:cardId';
  tokenServiceUrl = 'https://api.stripe.com/v1/tokens';

  ng.module('supportVine')
    .factory('BillingService', [
      '$resource', function($resource) {
        return $resource(billingCardServiceUrl, {
          customerId: '@customerId',
          cardId: '@cardId'
        }, {
          queryCard: {
            headers: {
              Authorization: 'Bearer sk_test_ekfNmM0J9V7S1tdHlXwNwoIG'
            }
          },
          saveCard: {
            method: 'POST',
            headers: {
              Authorization: 'Bearer sk_test_ekfNmM0J9V7S1tdHlXwNwoIG',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
              var p, str;
              str = [];
              for (p in obj) {
                if (obj[p] == null) {
                  obj[p] = "";
                }
                if (p.substr(0, 1) !== '$') {
                  str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
              }
              return str.join('&');
            }
          },
          saveCustomer: {
            url: billingCustomerServiceUrl,
            method: 'POST',
            headers: {
              Authorization: 'Bearer sk_test_ekfNmM0J9V7S1tdHlXwNwoIG',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
              var p, str;
              str = [];
              for (p in obj) {
                if (obj[p] == null) {
                  obj[p] = "";
                }
                if (p.substr(0, 1) !== '$') {
                  str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
              }
              return str.join('&');
            }
          }
        });
      }
    ]);

})(angular);