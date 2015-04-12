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
    userApi.getUser(userId).then(function(user){
      wallet.user = user;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);

    wallet.setBalance = function(amount){
      wallet.user.wallet += amount;
    }
  }
})();
