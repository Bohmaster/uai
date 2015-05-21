angular
  .module('uai.module.core')
    .controller('MainController',
      ['$scope', '$http', '$log', 'Profesional',
        function($scope, $http, $log, Profesional) {

        /**
        * TRANSLATIONS CONFIG
        **/

        $scope.lenguaje = "esp";

        $scope.traducciones = [];

        $http.get('translations.json')
          .then(function(data) {
            $scope.traducciones = data.data;
            $scope.translated = $scope.traducciones[$scope.lenguaje];
            $log.log($scope.translated);
        });

        $scope.traducir = function(e) {
          var lang = e.target.id;
          $scope.lenguaje = lang;
          $scope.translated = $scope.traducciones[lang];
          $log.log($scope.lenguaje);
        };

        /**
        * PROFESIONALES CONFIG
        **/

        $scope.profesionales = [];

        function cargarProfesionales() {
          Profesional.find(function(data) {
            $scope.profesionales = data;
          }, function(error) {
            console.log(error);
          });
        }

        cargarProfesionales();

    }]);
