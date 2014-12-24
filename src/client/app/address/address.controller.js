(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Address', Address);

  Address.$inject = ['$scope','userApi'];



  function Address($scope, userApi) {

    $scope.currentUser = $scope.getCurrentUser();
    $scope.address = {};
    $scope.addresses = [];
    $scope.show = false;


    userApi.getAddresses($scope.currentUser.objectId).then(function(addresses){
      $scope.addresses =  addresses.results;
    },function(error){
      console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
    });


    $scope.saveAddress = function(){
      if($scope.addressForm.$valid){
        $scope.address.user = {"__type":"Pointer",className:"_User","objectId":$scope.currentUser.objectId}
        userApi.saveAddress($scope.address).then(function(address){
          console.log(address);
          $scope.addresses.push(address);
          $scope.address = {};
          $scope.addressForm.$setPristine();
          $scope.show = false;
        },function(error){
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }
    }

    $scope.deleteAddress = function(objectId, index){

      userApi.deleteAddress(objectId).then(function(response){
        console.log(response);
        $scope.addresses.splice(index,1);
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      })
    }
    
  }

})();
