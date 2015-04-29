angular
  .module('uai.module.core')
    .controller('MainController',
      ['$scope', '$state', 'News', '$http',
        function($scope, $state, Noticia, $http) {

          // Initialization
          $scope.news = [];

          function getNews() {
            Noticia.find(
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
            console.log($scope.images);
            Noticia.create({
                'titulo': $scope.title,
                'descripcion': $scope.description,
                'cuerpo': $scope.body,
                'portada': $scope.files[0].name,
                'destacada': $scope.destacado
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

            $scope.upload();
          };

          $scope.removeNotice = function(id) {
            Noticia.deleteById({
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

          // Events
          $scope.$broadcast('notice.created', {'data': 'data'});

          $scope.$on('notice.created', function(event, data) {
            $scope.news.unshift(data);
          });

          $scope.filesChanged = function(elm) {
            $scope.files = elm.files;
            $scope.$apply();
          };

          $scope.upload = function() {
            var fd = new FormData();
            angular.forEach($scope.files, function(file) {
              fd.append('file', file);
            });
            $http.post('/api/containers/images/upload',
              fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
              }
            ).success(function(d){
                console.log(d);
                console.log($scope.files);
              })
              .error(function(e) {
                console.log(e);
              })
          }

    }]);
