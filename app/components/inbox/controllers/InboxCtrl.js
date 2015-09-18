'use strict';

/**
 * Inbox controller
 */
(function(ng) {
  ng.module('supportVine')
    .controller('InboxCtrl', [
      '$scope', '$stateParams', '$state', 'MessageServices', 'UserService','SvSelectChannelFilterService',
      function($scope, $stateParams, $state, MessageServices,  UserService, SvSelectChannelFilterService) {

        var reachedToEnd, nextPageNo, pageSize;
        pageSize =  10;
        // bind variables to scope
        $scope.mychannels = UserService.getMyChannels();
        $scope.teamMemberHash = UserService.getTeamMemberHash();
        $scope.global = SvSelectChannelFilterService.getGlobal();
        $scope.selectedMessageKey = null;
        $scope.channelFilterChanged = $scope.loadMessages;

        // Sort by options
        $scope.sortByOptions = [
          {
            key: '-receivedDate',
            value: 'Most Recent'
          },
          {
            key: 'receivedDate',
            value: 'Oldest'
          }
        ];

        // sort filter
        $scope.sortFilter = {
          sortBy: '-receivedDate',
          filterBy: ""
        };

        // watching global.fromChannel.key for change if there's a change we load messages again
        $scope.$watch('global.fromChannel.key', function(nVal, oVal){
          if(nVal !== oVal){
            $scope.loadMessages();
          }
        });

        // if we get a channel as state param we are setting it in global
        if ($stateParams.channelKey) {
          $scope.global.fromChannel.key = $stateParams.channelKey;
        }

        /**
         * Load archive messages
         */
        $scope.selectMessage = function(message) {
          if (!message) {
            return;
          }
          $scope.selectedMessageKey = message.key;
          $state.go('landing.inbox.detail', {
            key: message.key
          });
        };

        /**
         * Load archive messages
         */
        $scope.loadMessages = function() {
          nextPageNo = 1;
          reachedToEnd = false;

          // resetting message array
          $scope.messages = [];
          $scope.nextPage();
        };

        /**
         * get next page message - if we are on page 1 will get the first page.
         */
        $scope.nextPage = function() {
          var params;
          // checking if we either busy loading or has no more pages to load
          if ($scope.inboxPagerBusy || reachedToEnd) {
            return;
          }
          $scope.inboxPagerBusy = true;

          // get next page
          nextPageNo = nextPageNo + Math.floor(($scope.messages.length - (nextPageNo - 1) * pageSize) / pageSize);

          // set up params
          params = {
            userTeamKey: UserService.getUser().teamKey,
            page: nextPageNo,
            per_page: pageSize,
            sort: ($scope.sortFilter.sortBy.substring(0, 1) === '-' ? $scope.sortFilter.sortBy.substring(1) : $scope.sortFilter.sortBy),
            order: ($scope.sortFilter.sortBy.substring(0, 1) === '-' ? 'desc' : 'asc'),
            // setting archived/reply to false tells the server to load only none archives
            archived : false,
            reply: false
          };

          // tell server to also filter by channel key
          if ($scope.global.fromChannel.key !== "") {
            params.channel = $scope.global.fromChannel.key;
          }

          // tell server to also filter by keyword/search value
          if ($scope.sortFilter.filterBy !== "") {
            params.searchby = $scope.sortFilter.filterBy;
          }

          // querying the server for messages
          MessageServices.query(params, function(data, headers) {
            // getting only the current messages
            $scope.messages = $scope.messages.slice(0, $scope.messages.length - $scope.messages.length % pageSize);

            // if we have a length we concat the message we have with the messages we got from server
            if(data.length){
              $scope.messages = $scope.messages.concat(data);
            }

            // if the amount of messages we got is smaller then page size we reached the end
            if(data.length < pageSize){
              reachedToEnd = true;
            }

            // select the first message in the array
            $scope.selectMessage($scope.messages[0]);
            // we are no longer busy
            $scope.inboxPagerBusy = false;
          });
        };

        // load messages on first entry
        $scope.loadMessages();
      }
    ]);
})(angular);