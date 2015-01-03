(function() {
  'use strict';

  angular
  .module('app.layout')
  .controller('Login', Login);

  Login.$inject = ['$scope','$state','userApi','storage'];

  function Login($scope, $state, userApi, storage) {



    $scope.setUser = function(user){
      $scope.setCurrentUser(user);
      $state.go('dashboard.cards');
    }
    
  }

})();
