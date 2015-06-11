angular.module('uai.module.core')
  .run(function($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function() {
      console.log('View loaded');
      Webflow.ready();
    });
  });
