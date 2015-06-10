angular
  .module('uai.module.core')
    .controller('MainController',
      ['$scope', '$http', '$log', 'Profesional', 'Notis', 'Portfolio',
        function($scope, $http, $log, Profesional, Notis, Portfolio) {

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

        // Noticia slider

        function cargarNoticia() {
          Notis.find({
              filter: {
                limit: 1,
                order: 'id DESC'
              }
            }, function (data) {
              $scope.noticia = data[0];
              console.log($scope.noticia);
            });
          }


        cargarNoticia();

        function cargarNoticias() {
          Notis.find(function(data) {
            $scope.noticias = data;
          }, function(err) {
            console.log(err);
          });
        }

        cargarNoticias();

        function cargarPortfolio() {
          Portfolio.find(function(data) {
            $scope.porfolio = data[0];
          });
        }

        cargarPortfolio();

    }]);
