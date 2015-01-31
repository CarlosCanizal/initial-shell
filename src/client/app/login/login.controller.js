(function() {
  'use strict';

  angular
  .module('app.layout')
  .controller('Login', Login);

  Login.$inject = ['$scope','$state','userApi','storage'];

  function Login($scope, $state, userApi, storage) {
    var shell = $scope.shell

    $scope.setUser = function(user){
      shell.setCurrentUser(user);
      $state.go('dashboard.account');
    }
    
  }

})();
