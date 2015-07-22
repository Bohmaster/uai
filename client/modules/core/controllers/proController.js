angular
  .module('uai.module.core')
  .controller('proController', function($scope, $http, Profesional, $modal) {

      $scope.profesionales = [];

      $scope.model = {
            nombre: '',
            tituloEsp: '',
            descripcionEsp: '',
            tituloIng: '',
            descripcionIng: ''
          };

      function cargarProfesionales() {
          Profesional.find(function(data) {
            $scope.profesionales = data;
          }, function(error) {
              console.log(error);
          });
      }

      $scope.lastProfesional = function() {
        prof = Profesional.find({
          filter: {
            limit: 10,
            order: 'id DESC'
            }
        }, function (data) {
          $scope.prof = data;
          console.log($scope.prof);
        });
      }

      $scope.agregarProfesional = function() {
          Profesional.create({
              'nombre': $scope.model.nombre,
              'tituloEsp': $scope.model.tituloEsp,
              'descripcionEsp': $scope.model.descripcionEsp,
              'tituloIng': $scope.model.tituloIng,
              'descripcionIng': $scope.model.descripcionIng,
              'foto': $scope.files[0].name
            },
            function(success, headers) {
                console.log('New notice added sucessfuly');
                console.log(success);
                console.log($scope.tituloEsp);
              },
              function(error) {
                console.log(error);
              }
            );

        $scope.upload();
        cargarProfesionales();
      };

      $scope.borrarProfesional = function(id) {
        Profesional.deleteById({
            'id': id
            },
           function(success, headers) {
              console.log('New notice deleted sucessfuly');
              cargarProfesionales();
            },
           function(error) {
              console.log(error);
              }
          );
      };

      $scope.editarProfesional = function(modelId) {
          $modal.open({
            templateUrl: 'modules/core/views/editar-profesional.html',
            resolve: {
              profesional: function(Profesional) {
                return Profesional.findById({id: modelId});
              }
            },
            controller: function($scope, $rootScope, profesional, Profesional, $http) {
              $scope.profesional = profesional;

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

              $scope.editarProfesional = function() {
                if ($scope.files) {
                  $http.put('/api/profesionals/' + modelId, {
                    nombre: $scope.profesional.nombre,
                    tituloEsp: $scope.profesional.tituloEsp,
                    descripcionEsp: $scope.profesional.descripcionEsp,
                    tituloIng: $scope.profesional.tituloIng,
                    descripcionIng: $scope.profesional.descripcionIng,
                    foto: $scope.files[0].name
                  })
                  .then(function(data) {
                    console.log(data);
                    $scope.upload();
                    $rootScope.$broadcast('profesional.editado');
                    $scope.$close(data);
                  });
                } else {
                  $http.put('/api/profesionals/' + modelId, {
                    nombre: $scope.profesional.nombre,
                    tituloEsp: $scope.profesional.tituloEsp,
                    descripcionEsp: $scope.profesional.descripcionEsp,
                    tituloIng: $scope.profesional.tituloIng,
                    descripcionIng: $scope.profesional.descripcionIng
                  })
                  .then(function(data) {
                    console.log(data);
                    $rootScope.$broadcast('profesional.editado');
                    $scope.$close(data);
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
              }
            ).success(function(d){
                console.log(d);
                console.log($scope.files);
              })
              .error(function(e) {
                console.log(e);
              });
      };

      cargarProfesionales();

      $scope.$on('profesional.editado', function(event) {
        cargarProfesionales();
      });

  });
