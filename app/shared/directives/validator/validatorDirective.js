'use strict';

/**
 * This directive works in conjunction with rc-submit and will
 * validate certain inputs according to the selected validator
 */
(function(ng) {
  ng.module('supportVine')
    .directive('validator', [
      'ValidatorsService', 'SvUtilsService',
      function(ValidatorsService, SvUtilsService) {
        return {
          restrict: 'A',
          require: 'ngModel',
          link: function(scope, element, attrs, ngModelCtrl) {
            var validate, validators;
            validate = function(value) {
              var beforeErrorName, p, valid;
              if (ngModelCtrl.$isEmpty(value)) {
                ngModelCtrl.$setValidity(this.errorName, true);
                return value;
              }
              p = scope.$eval(this.expression);
              p.push({
                scope: scope
              });
              p.unshift(value);
              beforeErrorName = this.errorName;
              valid = ValidatorsService[this.name].apply(ValidatorsService, p);
              if (ng.isObject(valid)) {
                this.errorName = valid.errorName;
                valid = valid.result;
              }
              if (beforeErrorName !== this.errorName) {
                ngModelCtrl.$setValidity(beforeErrorName, true);
              }
              ngModelCtrl.$setValidity(this.errorName, valid);
              if (valid) {
                return value;
              } else {
                return void 0;
              }
            };
            validators = attrs.validator.split('|');
            return ng.forEach(validators, function(v) {
              var cName, context, name, params, separator;
              separator = v.indexOf(':');
              params = '';
              name = v;
              if (separator > -1) {
                name = v.substring(0, separator);
                params = v.substr(separator + 1);
              }
              cName = SvUtilsService.camelcase(name);
              context = {
                expression: '[' + params + ']',
                errorName: 'validator' + SvUtilsService.capitalize(cName),
                name: cName
              };
              ngModelCtrl.$parsers.unshift(function(value) {
                return validate.call(context, value);
              });
              return ngModelCtrl.$formatters.unshift(function(value) {
                return validate.call(context, value);
              });
            });
          }
        };
      }
    ]);

})(angular);