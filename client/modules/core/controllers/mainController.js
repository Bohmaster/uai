angular
  .module('uai.module.core')
    .controller('MainController',
      ['$scope', '$state', 'News',
        function($scope, $state, News) {

          // Initialization
          $scope.news = [];

          function getNews() {
            News.find(
              function (data, headers) {
                $scope.news = data;
                console.log(data);
              },
              function(error) {
                console.log(error);
            });
          }

          getNews();

          // Methods
          $scope.addNotice = function(notice) {
            News.create({
                'title': $scope.title,
                'description': $scope.description,
                'body': $scope.body
              },
              function(success, headers) {
                console.log('New notice added sucessfuly');
                console.log(success);
                $scope.$broadcast('notice.created', success);
              },
              function(error) {
                console.log(error);
              }
            );
          };

          $scope.removeNotice = function(id) {
            News.deleteById({
                'id': id
              },
              function(success, headers) {
                console.log('New notice deleted sucessfuly');
                getNews();
              },
              function(error) {
                console.log(error);
              }
            );
          };

          $scope.detailNotice = function() {
            $state.go('app.detail');
          };

          // Events
          $scope.$broadcast('notice.created', {'data': 'data'});

          $scope.$on('notice.created', function(event, data) {
            $scope.news.unshift(data);
          });

    }]);
