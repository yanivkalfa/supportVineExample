'use strict';

/**
 * Account billing controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('AccountBillingCtrl', [
      '$rootScope', '$scope', '$stateParams', '$state', 'BillingService', '$http',
      function($rootScope, $scope, $stateParams, $state, BillingService, $http) {
        var init;

        // stripe url - no used yet
        var tokenServiceUrl;
        tokenServiceUrl = 'https://api.stripe.com/v1/tokens';

        /**
         * Init all scope variables
         */
        init = function() {
          var i, l;
          // current country
          $scope.country = {
            key: 'US',
            name: 'United States'
          };

          // available counties
          $scope.countries = [
            {
              key: 'US',
              name: 'United States'
            }
          ];

          // months of the year
          $scope.months = [
            {
              value: 0,
              innerHTML: 'January'
            }, {
              value: 1,
              innerHTML: 'February'
            }, {
              value: 2,
              innerHTML: 'March'
            }, {
              value: 3,
              innerHTML: 'April'
            }, {
              value: 4,
              innerHTML: 'May'
            }, {
              value: 5,
              innerHTML: 'June'
            }, {
              value: 6,
              innerHTML: 'July'
            }, {
              value: 7,
              innerHTML: 'August'
            }, {
              value: 8,
              innerHTML: 'September'
            }, {
              value: 9,
              innerHTML: 'October'
            }, {
              value: 10,
              innerHTML: 'November'
            }, {
              value: 11,
              innerHTML: 'December'
            }
          ];
          // availabel years
          $scope.years = [];
          i = new Date().getFullYear();
          l = i + 15;
          while (i < l) {
            $scope.years.push({
              value: i,
              innerHTML: i
            });
            i++;
          }
        };

        /**
         * Reseting credit card object and setting displayNewCCInput to true (showing the cc form)
         */
        $scope.openNewCCDialog = function() {
          $scope.newCard = {
            number: "",
            cvc: null,
            expMonth: null,
            expYear: null
          };
          $scope.displayNewCCInput = true;
        };

        /**
         * set displayNewCCInput to false (hiding the cc form)
         */
        $scope.closeNewCCDialog = function() {
          $scope.displayNewCCInput = false;
        };

        /**
         * Get the customer credit card into
         */
        $scope.getCustomerCard = function() {
          BillingService.queryCard({
            customerId: 'cus_44mW0p8FgBhrE0'
          }, function(data) {
            $scope.customerCard = data.data[0];
            console.log('customerCard', $scope.customerCard);
          });
        };

        /**
         * Save credit card and billing info
         */
        $scope.saveCreditCard = function() {
          Stripe.card.createToken({
            number: $scope.newCard.number,
            cvc: $scope.newCard.cvc,
            exp_month: $scope.newCard.expMonth,
            exp_year: $scope.newCard.expYear,
            address_line1: $scope.customerCard.address_line1,
            address_line2: $scope.customerCard.address_line2,
            address_city: $scope.customerCard.address_city,
            address_state: $scope.customerCard.address_state,
            address_zip: $scope.customerCard.address_zip,
            address_country: $scope.customerCard.address_country
          }, function(status, response) {
            var token;
            if (response.error) {
              console.log(response.error);
            } else {
              token = response['id'];
              console.log('token', token);
              BillingService.saveCustomer({
                customerId: $scope.customerCard.customer
              }, {
                card: token
              }, function(customer) {
                $scope.customerCard = customer.cards.data[0];
                console.log('customerCard', $scope.customerCard);
              });
            }
          });
        };

        /**
         * Save only billing info.
         */
        $scope.saveBillingAddress = function() {
          BillingService.saveCard({
            customerId: $scope.customerCard.customer,
            cardId: $scope.customerCard.id
          }, {
            address_line1: $scope.customerCard.address_line1,
            address_line2: $scope.customerCard.address_line2,
            address_city: $scope.customerCard.address_city,
            address_state: $scope.customerCard.address_state,
            address_zip: $scope.customerCard.address_zip,
            address_country: $scope.customerCard.address_country
          }, function(data) {
            $scope.customerCard = data;
            console.log('customerCard', $scope.customerCard);
          });
          console.log('token', token);
        };

        // Initializing
        init();
      }
    ])

})(angular);