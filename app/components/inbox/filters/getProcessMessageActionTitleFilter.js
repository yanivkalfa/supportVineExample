'use strict';

/**
 * Get process message action title filter
 * Format the visual representation of the submit button
 */
(function(ng) {
  ng.module('supportVine')
    .filter('getProcessMessageActionTitleFilter', function() {
      return function(message, toProcess) {
        var title;
        if (!message) {
          return null;
        }
        if (!toProcess) {
          return 'Select Action To Do';
        }
        title = [];
        if (toProcess.reply) {
          title.push('Reply');
        }

        if (toProcess.parentCase && ((toProcess.parentCase.key && !ng.equals(message.parentCase, toProcess.parentCase)) || (!toProcess.parentCase.key && toProcess.parentCase.title !== ""))) {

          if (toProcess.parentCase.key) {
            title.push('Assign Case');
          } else {
            title.push('Create Case');
          }
        }

        if (message.assignedTo && message.assignedTo.key !== toProcess.assignMember || (!message.assignedTo && toProcess.assignMember)) {
          title.push('Assign');
        }

        if (message.parentCase && !ng.equals(message.parentCase.caseTypesKeys, toProcess.caseTypesKeys) || (!message.parentCase && toProcess.caseTypesKeys.length)) {
          title.push('Categorize');
        }

        if (!title.length) {
          return 'Select Action To Do';
        } else {
          return title.join(' & ');
        }
      };
    });

})(angular);