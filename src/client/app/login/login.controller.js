(function() {
  'use strict';

  angular
  .module('app.layout')
  .controller('Login', Login);

  Login.$inject = ['$scope','$state','userApi'];

  function Login($scope, $state, userApi) {

    $scope.user = {};
    var vm = $scope;
    
    $scope.login = function(){
      userApi.login($scope.user).then(function(user){
        $scope.setCurrentUser(user);
        $state.go('cards');
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }
    
  }

})();
