'use strict';

/**
 * Holds task events
 */
(function(ng){

  ng.module('supportVine')
    .constant('TASKS_EVENTS', {
      TASK_CHANGED : 'TASK_CHANGED',
      CREATED: 'created',
      UPDATED: 'updated',
      REMOVED: 'removed',
      ASSIGNED: 'assigned',
      COMPLETED: 'completed',
      UNDONE : 'undone'
    });
})(angular);