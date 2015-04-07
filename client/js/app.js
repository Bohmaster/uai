/**
 * @name uaiApp
 * @desc Angular main application
 */
angular
  .module('uaiApp', [
    // declare dependencies
    'lbServices',
    'ui.router',
    'uai.module.core'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
                                                            $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'modules/core/views/app.html',
        controller: 'MainController'
      })
      .state('app.detail', {
        url: '/sabe',
        templateUrl: 'modules/core/views/detail.html'
      });

    $urlRouterProvider.otherwise('app');
  }])
  .controller('LoginController', ['$scope', 'User', function($scope, User) {
    $scope.login = function() {
      User.login()
    }
  }])
;
