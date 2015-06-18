angular.module('uai.module.core')
  .run(function($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function(event) {
      console.log('View loaded');
      Webflow.ready();
      console.log(event);
    });
  });
