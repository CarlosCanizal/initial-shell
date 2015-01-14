(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Address', Address);

  Address.$inject = ['$scope','userApi', 'sepomexAPI'];

  function Address($scope, userApi, sepomexAPI) {

    $scope.currentUser = $scope.getCurrentUser();
    $scope.address = {};
    $scope.addresses = [];
    $scope.addressFormView = false;


    userApi.getAddresses($scope.currentUser.objectId).then(function(addresses){
      $scope.addresses =  addresses.results;
    },function(error){
      console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
    });

    $scope.deleteAddress = function(objectId, index){

      userApi.deleteAddress(objectId).then(function(response){
        console.log(response);
        $scope.addresses.splice(index,1);
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      })
    }

    //refactorizar con direcative en shipping address
    $scope.showAddressForm = function(show){
      $scope.addressFormView = show;
    }
    
  }

})();
