angular
  .module('uai.module.core')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'modules/core/views/home.html'
      })
      .state('profesionales', {
        url: '/profesionales',
        templateUrl: 'modules/core/views/profesionales.html',
        controller: 'proController',
      })
      .state('portfolio', {
        url: '/portfolio',
        templateUrl: 'modules/core/views/portfolio.html',
        controller: 'portController',
      })
      .state('noticias', {
        url: '/noticias',
        templateUrl: 'modules/core/views/noticias.html',
        controller: 'notController',
      });

    $urlRouterProvider.otherwise('/app');
  }]);
