(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('AdminAddress', AdminAddress);

  AdminAddress.$inject = ['$scope','$stateParams','userApi', 'sepomexAPI'];

  function AdminAddress($scope,$stateParams, userApi, sepomexAPI) {
    var shell = $scope.shell;
    var address = this;

    address.address = {};
    address.addresses = [];
    address.addressFormView = false;
    $scope.loading = true;
    var user;

    userApi.getUser($stateParams.userId).then(function(result){
      user = result;
      return userApi.getAddresses(user.objectId);

    }).then(function(addresses){
      address.addresses =  addresses.results;

    },function(error){
      shell.setError(error);
    }).finally(function(){
      $scope.loading = false;
    });

    $scope.deleteAddress = function(objectId, index){
      shell.showLoading()
      userApi.deleteAddress(objectId).then(function(response){
        address.addresses.splice(index,1);
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading)
    }

    //refactorizar con direcative en shipping address
    $scope.showAddressForm = function(show){
      address.addressFormView = show;
    }
    
  }

})();