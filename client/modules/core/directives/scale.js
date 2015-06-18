angular.module('uai.module.core')
  .directive('scale', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {

        elem.on('click', function() {
          TweenMax.to(elem, 0.6,
            {
              css: {
                scale: 1.4
              },
              ease: Quad.easeInOut
            }
          );
        });

        scope.$watch('lenguaje', function(newVal) {
          if (attrs.id != newVal) {
            TweenMax.to(elem, 0.6, {css: {scale: 1}, ease:Quad.easeInOut});
          }
        });
      }
    }
  })
  .directive('opacity', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.on('mouseover', function () {
          TweenMax.to(elem, 1, {css: {opacity: 1}, ease: Quad.easeInOut});
        });

        elem.on('mouseout', function () {
          TweenMax.to(elem, 0.5, {css: {opacity: 0.7}, ease: Quad.easeInOut});
        });
      }
    }
  })
  .directive('face', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {

        var face = angular.element('.seccface');

        scope.opened = false;

        elem.on('click', function() {
          if (!scope.opened) {
            TweenMax.to(face, 0.6, {
              right: "0px",
              ease: Quad.easeInOut
              }
            );
            scope.opened = true;
          } else {
            TweenMax.to(face, 0.6, {
              right: "-280px", ease: Quad.easeInOut
              }
            );
            scope.opened = false;
          }
        });
      }
    }
  })
  .directive('compile', function($compile) {
    return {
      restrict: 'A',
      scope: {
        data: '@compile'
      },
      compile: function(elem, attrs) {

        var x = attrs.compile;
        var y = "<span>" + x + "</span>"

        attrs.compile = y;

        return function postLink(scope, elem, attrs) {
          var linkFn = $compile(scope.data);
          var content = linkFn(scope);
          elem.append(content);
        }
      }

    }
  });
