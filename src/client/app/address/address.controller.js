(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Address', Address);

  Address.$inject = ['$scope','userApi'];


  function Address($scope, userApi) {

    $scope.currentUser = $scope.getCurrentUser();
    $scope.address = {};

    $scope.saveAddress = function(){

      $scope.address.user = {"__type":"Pointer",className:"_User","objectId":$scope.currentUser.objectId}
      userApi.saveAddress($scope.address).then(function(address){
        console.log(address);
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }
    
  }

})();
