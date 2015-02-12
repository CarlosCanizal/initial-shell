(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('AdminWallet', AdminWallet);

  AdminWallet.$inject = ['$scope','$stateParams', 'userApi'];

  function AdminWallet($scope, $stateParams, userApi) {
    var shell = $scope.shell;
    var wallet = this;
    wallet.user = null;

    var userId = $stateParams.userId;
    
    shell.showLoading();
    userApi.getUser().then(function(result){
      wallet.user = result.results[0];
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);

    wallet.setBalance = function(amount){
      console.log(amount);
      wallet.user.wallet += amount;
    }


  }

})();
