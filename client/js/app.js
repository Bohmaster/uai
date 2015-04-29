/**
 * @name uaiApp
 * @desc Angular main application
 */
angular
  .module('uaiApp', [
    // declare dependencies
    'lbServices',
    'ui.router',
    'uai.module.core',
    'angularFileUpload'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $rootScope, $window, $location) {
      return {
        request: function(cfg) {
          return $q.when(cfg);
        },
        response: function(res) {
          var sToken = $window.sessionStorage['cookieId'];
          var lToken = $window.localStorage['cookieId'];
          if (lToken) {
            $rootScope.currentUser = 2;
          } else {
            $rootScope.currentUser = 1;
          }
          console.log($rootScope.currentUser);
          return $q.when(res);
        }
      }
    });
  });
