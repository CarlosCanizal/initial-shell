(function() {
  'use strict';

  angular
  .module('app.layout')
  .controller('Login', Login);

  Login.$inject = ['$scope','$state','userApi','storage'];

  function Login($scope, $state, userApi, storage) {

    $scope.user = {};
    var vm = $scope;
    
    $scope.login = function(){
      userApi.login($scope.user).then(function(user){
        $scope.setCurrentUser(user);
        $state.go('dashboard.cards');
        storage.set('user',user);
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }
    
  }

})();
