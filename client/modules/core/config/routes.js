angular
  .module('uai.module.core')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'modules/core/views/app.html',
        controller: 'MainController'
      })
      .state('news', {
        'url': '/news',
        'templateUrl': 'modules/core/views/newsSection.html'
      })
      .state('news.detail', {
        url: '/:id',
        templateUrl: 'modules/core/views/detail.html',
        resolve: {
          noticia: function(Noticia, $stateParams) {
            return Noticia.findById({id: $stateParams.id},
              function(data, headers) {
                console.log(data)
              },
              function(err) {
                console.log(err);
              }
            );
          },
          response: function(notice) {
            console.log(notice);
          }
        },
        controller: ['$scope', '$stateParams', 'News', 'noticia', function($scope, $stateParams, News, notice) {
          var id = $stateParams.id;
          $scope.notice = noticia;
        }]
      });

    $urlRouterProvider.otherwise('/app');

  }]);
