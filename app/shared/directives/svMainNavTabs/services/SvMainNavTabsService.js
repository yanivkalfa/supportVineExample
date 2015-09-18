'use strict';

/**
 * Singletone service that holds / manipulate current tabs.
 */
(function(ng) {
  ng.module('supportVine')
    .service('SvMainNavTabsService', [
      '$state', 'Collection','CaseHelperService', 'TABLIST',
      function($state, Collection, CaseHelperService, TABLIST) {

        /**
         * Holds / manipulate current tabs.
         *
         * @param {Object} tabs
         * @constructor
         * @extends Collection
         */
        function SvMainNavTabsService(tabs){
          Collection.apply(this,arguments);
          this._active = undefined;
        }
        SvMainNavTabsService.prototype = Object.create(Collection.prototype);
        SvMainNavTabsService.prototype.constructor = SvMainNavTabsService;

        // setting active properties to false on all tabs
        SvMainNavTabsService.prototype.cleanTabs = function() {
          ng.forEach(this.get(), function(tab){
            tab.active = false;
          });
        };

        // get current active tab
        SvMainNavTabsService.prototype.getActive = function() {
          return this._active;
        };

        // get current active tab
        SvMainNavTabsService.prototype.setActive = function(active) {
          this._active = active;
        };

        // check the state and return the tab name accordingly.
        SvMainNavTabsService.prototype.getActiveTabName = function(){

          if ($state.includes('landing.team.members')) {
            return 'teamMembers';
          }

          if ($state.includes('landing.team.channels')) {
            return 'teamChannels';
          }

          if ($state.includes('landing.account.billing')) {
            return 'accountBilling';
          }

          if ($state.includes('landing.account.plans')) {
            return 'accountPlans';
          }

          if ($state.includes('landing.account.close')) {
            return 'accountClose';
          }


          if ($state.includes('landing.archive.recent')) {
            return 'archiveRecent';
          }

          if ($state.includes('landing.archive.replies')) {
            return 'archiveReplies';
          }

          if ($state.includes('landing.cases.detail')) {
            return 'caseDetails';
          }
          if ($state.includes('landing.inbox')) {
            return 'inbox';
          }
          if ($state.includes('landing.cases')) {
            return 'cases';
          }

          if ($state.includes('landing.tasks')) {
            return 'tasks';
          }
          if ($state.includes('landing.archive')) {
            return 'archive';
          }

          if ($state.includes('landing.account')) {
            return 'archive';
          }

          if ($state.includes('landing.team')) {
            return 'team';
          }
        };

        // if we are in a child state this will return the top most parent state
        SvMainNavTabsService.prototype.getRootTab = function(tabName) {
          return TABLIST[tabName] || tabName;
        };

        // checking which tab fits the state and set its active property to true.
        SvMainNavTabsService.prototype.selectTab = function() {
          var active, activeTab;
          active = this.getActiveTabName();
          this.setActive(active);
          activeTab = this.get({id: this.getRootTab(active)});

          if(activeTab){
            this.cleanTabs();
            activeTab.active = true;
          }
        };

        // get current active tab
        SvMainNavTabsService.prototype.setMsgCount = function(tabId, count) {
          if(!ng.isNumber(count) || !isFinite(count)){
            return false;
          }

          var tab = this.get({id: tabId});
          if(tab){
            tab.msgCount = count;
          }
          return true;
        };

        // returning new instance of the class while initialising it with our tabs
        return new SvMainNavTabsService({
          unique : true,
          prop : 'id',
          collection : [
            {id:'inbox', state : 'landing.inbox', label : 'Inbox', msgCount : null, active : true, icon:'fa-envelope'},
            {id:'tasks', state : 'landing.tasks', label : 'Tasks', msgCount : null, active : false, icon:'fa-list'},
            {id:'cases', state : 'landing.cases.list', label : 'Cases', msgCount : null, active : false, icon:'fa-briefcase', onClick : CaseHelperService.openCreateCaseModal},
            {id:'archive', state : 'landing.archive.recent', label : 'Archive', msgCount : null, active : false, icon:'fa-archive'},
            {id:'account', state : 'landing.account.billing', label : 'Account', msgCount : null, active : false, icon:'fa-user'},
            {id:'team', state : 'landing.team.members', label : 'Team', msgCount : null, active : false, icon:'fa-group', access : ['admin']}
          ]
        });
      }
    ]);

})(angular);
