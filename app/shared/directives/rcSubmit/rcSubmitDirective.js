'use strict';

/**
 * This directive is used to validate input on form submit.
 *
 * Usage:
 * You add rc-submit attribute to the form with the function you want to invoke upon form valid.
 *
 * On each input you add the validator you want to validate against E.G: validator="luhnCheck"
 *
 * To show error you would do something like :
 * <p ng-show="newCreditCard.number.$error.luhnCheck" class="help-block">Credit card number is required.</p>
 *
 * where rc is the name of the form, newCreditCard is the name of the field
 * You'll add $error.luhnCheck which is the name of the validator
 */
(function(ng) {
  ng.module('supportVine')
    .directive('rcSubmit', [
      '$parse', '$q', '$timeout',
      function($parse, $q, $timeout) {
        return {
          restrict: 'A',
          require: ['rcSubmit', '?form'],
          controller: [
            '$scope', function($scope) {
              var attemptHandlers, formController, formElement, submitCompleteHandlers;
              formElement = null;
              formController = null;
              attemptHandlers = [];
              submitCompleteHandlers = [];
              this.attempted = false;
              this.submitInProgress = false;
              this.setFormElement = function(element) {
                formElement = element;
              };
              this.submit = function() {
                if (!formElement) {
                  return;
                }
                jQuery(formElement).submit();
              };
              this.onAttempt = function(handler) {
                attemptHandlers.push(handler);
              };
              this.setAttempted = function() {
                this.attempted = true;
                ng.forEach(attemptHandlers, function(handler) {
                  handler();
                });
              };
              this.setFormController = function(controller) {
                formController = controller;
              };
              this.needsAttention = function(fieldModelController) {
                if (!formController) {
                  return false;
                }
                if (fieldModelController) {
                  return fieldModelController.$invalid && (fieldModelController.$dirty || this.attempted);
                } else {
                  return formController && formController.$invalid && (formController.$dirty || this.attempted);
                }
              };
              this.onSubmitComplete = function(handler) {
                submitCompleteHandlers.push(handler);
              };
              this.setSubmitComplete = function(success, data) {
                ng.forEach(submitCompleteHandlers, function(handler) {
                  handler({
                    success: success,
                    data: data
                  });
                });
              };
            }
          ],
          compile: function(cElement, cAttributes, transclude) {
            return {
              pre: function(scope, formElement, attributes, controllers) {
                var formController, submitController;
                submitController = controllers[0];
                formController = (controllers.length > 1 ? controllers[1] : null);
                submitController.setFormElement(formElement);
                submitController.setFormController(formController);
                scope.rc = scope.rc || {};
                scope.rc[attributes.name] = submitController;
              },
              post: function(scope, formElement, attributes, controllers) {
                var fn, formController, submitController;
                submitController = controllers[0];
                formController = (controllers.length > 1 ? controllers[1] : null);
                fn = $parse(attributes.rcSubmit);
                formElement.bind('submit', function(event) {
                  var doSubmit;
                  submitController.setAttempted();
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                  if (!formController.$valid) {
                    return false;
                  }
                  doSubmit = function() {
                    var returnPromise;
                    submitController.submitInProgress = true;
                    if (!scope.$$phase) {
                      scope.$apply();
                    }
                    returnPromise = $q.when(fn(scope, {
                      $event: event
                    }));
                    returnPromise.then((function(result) {
                      submitController.submitInProgress = false;
                      submitController.attempted = false;
                      submitController.needsAttention;
                      if (!scope.$$phase) {
                        scope.$apply();
                      }
                      $timeout(function() {
                        submitController.setSubmitComplete(true, result);
                      });
                    }), function(error) {
                      submitController.submitInProgress = false;
                      submitController.attempted = false;
                      submitController.needsAttention;
                      if (!scope.$$phase) {
                        scope.$apply();
                      }
                      $timeout(function() {
                        submitController.setSubmitComplete(false, error);
                      });
                    });
                  };
                  if (!scope.$$phase) {
                    scope.$apply(doSubmit);
                  } else {
                    doSubmit();
                    if (!scope.$$phase) {
                      scope.$apply();
                    }
                  }
                });
              }
            };
          }
        };
      }
    ]);

})(angular);