angular
  .module('uai.module.core')
  .controller('LoginController', function($rootScope, $scope, $window, $location, User) {
    $rootScope.currentUser = 1;

    $scope.login = function(user, password) {
      User.login({'username': user, 'password': password
        }, function(res) {
          console.log(res.user);
          $rootScope.currentUser = 2;
          $window.sessionStorage['cookieId'] = res.id;
          $window.localStorage['cookieId'] = res.id;
          $location.path('/app')
        }, function(err) {
          console.log(err.data.error);
          $rootScope.currentUser = 1;
      });
    };

    $scope.logout = function() {
      User.logout(function(success, responseHeaders) {
        console.log("logged out");
        delete $window.sessionStorage['cookieId'];
        delete $window.localStorage['cookieId'];
        $rootScope.currentUser = 1;
        $location.path('/app')
      }, function(err) {
        console.log(err);
      });
    };
  });
