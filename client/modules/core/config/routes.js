angular
  .module('uai.module.core')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '',
        views: {
          "base": {
            templateUrl: 'modules/core/views/home.html'
          }
        }
      })
      .state('adm1n', {
        url: '/adm1n',
        views: {
          "base": {
            templateUrl: 'modules/core/views/adm1n.html'
          }
        }
      })
      .state('adm1n.profesionales', {
        url: '/profesionales',
        templateUrl: 'modules/core/views/profesionales.html',
        controller: 'proController'
      })
      .state('adm1n.portfolio', {
        url: '/portfolio',
        templateUrl: 'modules/core/views/portfolio.html',
        controller: 'portController'
      })
      .state('adm1n.noticias', {
        url: '/noticias',
        templateUrl: 'modules/core/views/noticias.html',
        controller: 'notController'
      });

    $urlRouterProvider.otherwise('');
  }]);
