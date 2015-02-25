(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Address', Address);

  Address.$inject = ['$scope','userApi', 'sepomexAPI'];

  function Address($scope, userApi, sepomexAPI) {
    var shell = $scope.shell;
    var address = this;
    var view = $scope.view;

    address.address = {};
    address.addresses = [];
    address.addressFormView = false;
    $scope.loading = true;

    if(view)
      address.user = view.user;
    else
      address.user = shell.currentUser;


    userApi.getAddresses(address.user.objectId).then(function(addresses){
      address.addresses =  addresses.results;
    },function(error){
      shell.setError(error);
    }).finally(function(){
      $scope.loading = false;
    });

    $scope.deleteAddress = function(objectId, index){
      shell.showLoading();
      userApi.deleteAddress(objectId).then(function(response){
        address.addresses.splice(index,1);
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    };

    //refactorizar con direcative en shipping address
    $scope.showAddressForm = function(show){
      address.addressFormView = show;
    };
    
  }

})();