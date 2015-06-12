angular
.module('uai.module.core')
.controller('portController', function($scope, $http, Portfolio, $modal) {

  $scope.portfolios = [];

  $scope.model = {
    descripcionEsp: '',
    descripcionIng: '',
    descripcionPor: '',
    descripcionFra: ''
  };

  function cargarPortfolios() {
    Portfolio.find(function(data) {
      $scope.portfolios = data;
    }, function(error) {
      console.log(error);
    });
  }

  $scope.agregarPortfolio = function() {
    Portfolio.create({
      'descripcionEsp': $scope.model.descripcionEsp,
      'descripcionIng': $scope.model.descripcionIng,
      'descripcionPor': $scope.model.descripcionPor,
      'descripcionFra': $scope.model.descripcionFra
      },
      function(success, headers) {
        console.log('New notice added sucessfuly');
        console.log(success);
      },
      function(error) {
        console.log(error);
      }
    );

    cargarPortfolios();
  };

  $scope.borrarPortfolio = function(id) {
    Portfolio.deleteById({
      'id': id
      },
      function(success, headers) {
        console.log('New portfolio deleted sucessfuly');
        cargarPortfolios();
      },
      function(error) {
        console.log(error);
      });
    };

  $scope.editarPortfolio = function(modelId) {
    $modal.open({
      templateUrl: 'modules/core/views/editar-portfolio.html',
      resolve: {
        portfolio: function(Portfolio) {
          return Portfolio.findById({id: modelId});
        }
      },
      controller: function($scope, $rootScope, portfolio, Portfolio, $http) {
        $scope.portfolio = portfolio;

        $scope.editarPortfolio = function() {
          $http.put('/api/portfolios/' + modelId, {
            descripcionEsp: $scope.portfolio.descripcionEsp,
            descripcionIng: $scope.portfolio.descripcionIng,
            descripcionPor: $scope.portfolio.descripcionPor,
            descripcionFra: $scope.portfolio.descripcionFra,
          })
          .then(function(data) {
            console.log(data);
            $rootScope.$broadcast('portfolio.editado');
            $scope.$close(data);
          });
        }
      }
    });
  };


  cargarPortfolios();

  $scope.$on('portfolio.editado', function(event) {
    cargarPortfolios();
  });

});
