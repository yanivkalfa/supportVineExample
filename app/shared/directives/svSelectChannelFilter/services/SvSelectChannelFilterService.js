'use strict';

/**
 * Service that holds global filter.
 */
(function(ng) {
  ng.module('supportVine')
    .service('SvSelectChannelFilterService', [
      function() {

        function SvSelectChannelFilterService(){

          this.global = {
            fromChannel: {
              key: ""
            }
          };

        }

        SvSelectChannelFilterService.prototype.getGlobal = function() {
          return this.global;
        };

        return new SvSelectChannelFilterService();
      }
    ]);

})(angular);
