'use strict';

(function(ng) {
  ng.module('supportVine')
    .controller('ArchiveRepliesCtrl', [
      '$scope', '$stateParams', '$state', 'MessageServices', 'UserService','SvSelectChannelFilterService',
      function($scope, $stateParams, $state, MessageServices,  UserService, SvSelectChannelFilterService) {
        var reachedToEnd, nextPageNo, pageSize;
        pageSize =  10;

        // bind getGlobal to scope
        $scope.global = SvSelectChannelFilterService.getGlobal();

        // bind CaseTabsService's add to scope
        $scope.addCaseTab = _.bind(CaseTabsService.add,CaseTabsService);

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
            // setting archived to true tells the server to load only archived massages
            archived: true,
            // setting reply to true tells the server to load archived replies
            reply: true
          };

          // if we have a channel key we only load message belong to that channel
          if ($scope.global.fromChannel.key !== "") {
            params.channel = $scope.global.fromChannel.key;
          }

          // quering the server for messages
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

            // we are no longer busy
            $scope.inboxPagerBusy = false;
          });
        };

        // load messages on first entry
        $scope.loadMessages();
      }
    ]);
})(angular);