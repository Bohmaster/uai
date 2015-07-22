angular
.module('uai.module.core')
.controller('notController', function($scope, $http, Notis, $modal) {

  $scope.noticias = [];

  $scope.model = {
    tituloEsp: '',
    descripcionEsp: '',
    tituloIng: '',
    descripcionIng: '',
    tituloPor: '',
    descripcionPor: '',
    tituloFra: '',
    descripcionFra: '',
    imagen: ''
  };

  function cargarNoticias() {
    Notis.find(function(data) {
      $scope.noticias = data;
    }, function(error) {
      console.log(error);
    });
  }

  $scope.agregarNoticia = function() {
    Notis.create({
      'tituloEsp': $scope.model.tituloEsp,
      'descripcionEsp': $scope.model.descripcionEsp,
      'tituloIng': $scope.model.tituloIng,
      'descripcionIng': $scope.model.descripcionIng,
      'tituloPor': $scope.model.tituloPor,
      'descripcionPor': $scope.model.descripcionPor,
      'tituloFra': $scope.model.tituloFra,
      'descripcionFra': $scope.model.descripcionFra,
      'imagen': $scope.files[0].name
    },
    function(success, headers) {
      console.log('New notice added sucessfuly');
      console.log(success);
    },
    function(error) {
      console.log(error);
    });

    $scope.upload();
    cargarNoticias();
  };

  $scope.borrarNoticia = function(id) {
    Notis.deleteById({
      'id': id
    },
    function(success, headers) {
      console.log('New notice deleted sucessfuly');
      cargarNoticias();
    },
    function(error) {
      console.log(error);
    });
  };

  $scope.editarNoticia = function(modelId) {
    $modal.open({
      templateUrl: 'modules/core/views/editar-noticia.html',
      resolve: {
        noticia: function(Notis) {
          return Notis.findById({id: modelId});
        }
      },
      controller: function($scope, $rootScope, noticia, Notis, $http) {
        $scope.noticia = noticia;

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
        });
      };

        $scope.editarNoticia = function() {

          if ($scope.files) {
            $http.put('/api/Notis/' + modelId, {
              tituloEsp: $scope.noticia.tituloEsp,
              descripcionEsp: $scope.noticia.descripcionEsp,
              tituloIng: $scope.noticia.tituloIng,
              descripcionIng: $scope.noticia.descripcionIng,
              tituloPor: $scope.noticia.tituloPor,
              descripcionPor: $scope.noticia.descripcionPor,
              tituloFra: $scope.noticia.tituloFra,
              descripcionFra: $scope.noticia.descripcionFra,
              imagen: $scope.files[0].name || $scope.noticia.imagen
            })
            .success(function(data) {
              console.log(data);
              $scope.upload();
              $rootScope.$broadcast('Notis.editada');
              $scope.$close(data);
            })
            .error(function(err) {
              console.log(err);
            });
          } else {
            $http.put('/api/Notis/' + modelId, {
              tituloEsp: $scope.noticia.tituloEsp,
              descripcionEsp: $scope.noticia.descripcionEsp,
              tituloIng: $scope.noticia.tituloIng,
              descripcionIng: $scope.noticia.descripcionIng,
              tituloPor: $scope.noticia.tituloPor,
              descripcionPor: $scope.noticia.descripcionPor,
              tituloFra: $scope.noticia.tituloFra,
              descripcionFra: $scope.noticia.descripcionFra
            })
            .success(function(data) {
              console.log(data);
              $rootScope.$broadcast('Notis.editada');
              $scope.$close(data);
            })
            .error(function(err) {
              console.log(err);
            });
          }

        }
      }
    });
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
    })
    .success(function(d){
    console.log(d);
    console.log($scope.files);
    })
    .error(function(e) {
      console.log(e);
    });
  };

  cargarNoticias();

  $scope.$on('Notis.editada', function(event) {
    cargarNoticias();
  });

});
