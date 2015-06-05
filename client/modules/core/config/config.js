angular.module('uai.module.core')
  .run(function($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function() {
      console.log('View loaded');
      $timeout(function() {
        Webflow.ready();
        console.log('Webflow');
      }, 3000)
    });
  })
