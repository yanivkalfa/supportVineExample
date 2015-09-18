'use strict';

/**
 * Directive that controls channle filter
 */
(function(ng) {
  ng.module('supportVine')
    .directive('svSelectChannelFilter', [
      '$rootScope','$auth','UserService', 'SvSelectChannelFilterService',
      function($rootScope, $auth, UserService, SvSelectChannelFilterService) {
        return {
          restrict: 'EA',
          templateUrl: 'shared/directives/svSelectChannelFilter/views/svSelectChannelFilterView.html',
          scope: {},
          link: function(scope, elem) {


            scope.global = SvSelectChannelFilterService.getGlobal();

            scope.channelsSelectOptions = $.merge([ { key: "", name: 'All Channels' } ], UserService.getMyChannels());
          }
        };
      }
    ]);

})(angular);