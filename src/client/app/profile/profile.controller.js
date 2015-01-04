(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Profile', Profile);

  Profile.$inject = ['$scope','userApi'];

  function Profile($scope, userApi) {

    $scope.user = $scope.getCurrentUser();

    $scope.saveProfile = function(){
      userApi.saveProfile($scope.user).then(function(user){
        $scope.setCurrentUser(user);
        userApi.setCurrentUser(user);
      },function(error){
        console.log(error);
      });
    }
    
  }

})();
