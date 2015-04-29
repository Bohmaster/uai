angular.module('uai.module.core')
  .directive('news', function($window) {
    return {
      restrict: 'E',
      templateUrl: "modules/core/directives/news.html",
      link: function($scope, elem, attrs) {
        angular.element('.normal').on('mouseover', function() {
          var desc = angular.element(this).find('.description');
          TweenMax.to(desc, 0.2, {bottom: "0"});
        });
        angular.element('.normal').on('mouseout', function() {
          var desc = angular.element(this).find('.description');
          TweenMax.to(desc, 0.2, {bottom: "-100px"});
        });
      }
    }
  });
