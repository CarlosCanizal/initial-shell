(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Recovery', Recovery);

  Recovery.$inject = ['$scope','$state','$stateParams','userApi'];

  function Recovery($scope,$state, $stateParams, userApi) {
    var shell = $scope.shell;
    var recovery = this;

    shell.showLoading();
    userApi.getUserByKey($stateParams.key).then(function(){
    },function(){
      $state.go('login');
    }).finally(shell.hideLoading);


    recovery.update =  function(){
      if(recovery.form.$valid){
        shell.showLoading();
        userApi.recoveryPassword({key:$stateParams.key, password:recovery.password}).then(function(){
          
          $state.go('login');
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
    }

  }

})();
