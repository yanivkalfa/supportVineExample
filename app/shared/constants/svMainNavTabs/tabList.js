'use strict';
/**
 * holds all the tabs names
 */
(function(ng){
  ng.module('supportVine')
    .constant('TABLIST', {
      'caseDetails' : 'cases',
      'archiveRecent' : 'archive',
      'archiveReplies' : 'archive',
      'accountBilling' : 'account',
      'accountPlans' : 'account',
      'accountClose' : 'account',
      'teamMembers' : 'team',
      'teamChannels' : 'team'
    })
})(angular);
