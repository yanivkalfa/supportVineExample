'use strict';

/**
 * filter that returns the channel name by channel key
 */
(function(ng) {
  ng.module('supportVine')
    .filter('chanName', [
      'SvUtilsService', 'UserService', function(SvUtilsService, UserService) {
        return function(channelKey, channels) {
          var index;
          channels = channels || UserService.getMyChannels();
          index = SvUtilsService.lookupIndex(channels, 'key', channelKey);
          if (index > -1) {
            return channels[index].name;
          } else {
            return 'All Channels';
          }
        };
      }
    ])
})(angular);