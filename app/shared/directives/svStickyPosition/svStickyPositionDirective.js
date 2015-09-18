'use strict';

/**
 * Sticky position directive if you add sv-sticky-position to a node it will
 * stay in the same fixed position on the screen no matter where you scrolled
 */
(function(ng) {
  ng.module('supportVine')
    .directive('svStickyPosition', [
      '$window', '$document',
      function($window, $document) {
        return {
          restrict: 'EA',
          link: function(scope, element, attr) {
            var setSticky;
            if ($window.outerWidth < 1050) {
              return false;
            }
            setTimeout(function() {
              return setSticky();
            }, 1000);
            return setSticky = function() {
              var correctPosition, elementPosition, originalTop;
              elementPosition = element[0].getBoundingClientRect();
              originalTop = $window.pageYOffset + elementPosition.top;
              correctPosition = function() {
                if ($window.pageYOffset >= originalTop) {
                  return element.css({
                    position: 'fixed',
                    top: '-20px',
                    left: elementPosition.left + 'px',
                    width: elementPosition.width + 'px'
                  });
                } else {
                  return element.css({
                    position: 'static',
                    top: 'inherit',
                    left: 'inherit'
                  }, {
                    width: 'auto'
                  });
                }
              };
              correctPosition();
              return ng.element($window).bind('scroll', correctPosition);
            };
          }
        };
      }
    ]);

})(angular);