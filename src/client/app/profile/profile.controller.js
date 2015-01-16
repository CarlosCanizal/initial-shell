(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Profile', Profile);

  Profile.$inject = ['$scope','userApi'];

  function Profile($scope, userApi) {

    $scope.user = $scope.getCurrentUser();

    $scope.saveProfile = function(){
      $scope.setLoading(true);
      var sessionToken = $scope.user.sessionToken;
      userApi.saveProfile($scope.user).then(function(user){
        $scope.setLoading(false);
        $scope.updateCurrentUser();
      },function(error){
        console.error(error);
      });
    }
    
  }

})();
