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
          $log.log($scope.translated);
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

       // TABS

          $scope.tabSelected = 1;

          $scope.updateState = function(state) {
            $scope.tabSelected = state;
            console.log(state);
          }

       // NAVIGATION

          $scope.navigation = [
            '#inicio',
            '#nosotros',
            '#servicios',
            '#portfolio',
            '#noticias',
            'contacto'
          ];
    }]);
