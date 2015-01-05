(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Profile', Profile);

  Profile.$inject = ['$scope','userApi'];

  function Profile($scope, userApi) {

    $scope.user = $scope.getCurrentUser();
    console.log($scope.user);

    $scope.saveProfile = function(){
      console.log($scope.user.objectId);
      var sessionToken = $scope.user.sessionToken;
      userApi.saveProfile($scope.user).then(function(user){
        console.log(user);
        $scope.updateCurrentUser();
      },function(error){
        console.error(error);
      });
    }
    
  }

})();
