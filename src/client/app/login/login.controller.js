(function() {
  'use strict';

  angular
  .module('app.layout')
  .controller('Login', Login);

  Login.$inject = ['$scope','$state','userApi','storage'];

  function Login($scope, $state, userApi, storage) {
    
    $scope.login = function(){
      userApi.login($scope.user).then(function(user){
        currentUser(user);
      },function(error){
        console.log(error);
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }

    $scope.register = function(){
      userApi.register($scope.newUser).then(function(user){
        currentUser(user);
      },function(error){
        console.log(error);
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }

    function currentUser(user){
      $scope.setCurrentUser(user);
      $state.go('dashboard.cards');
    }
    
  }

})();
