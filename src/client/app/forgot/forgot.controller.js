(function() {
  'use strict';

  angular
  .module('app.layout')
  .controller('Forgot', Forgot);

  Forgot.$inject = ['$scope','userApi'];

  function Forgot($scope, userApi) {
    var shell = $scope.shell;
    var forgot = this;
    forgot.sendIt = false;

    forgot.sendLink = function(email){
      shell.showLoading();
      if($scope.forgotForm.$valid){
        userApi.sendLink(email).then(function(){
          forgot.sendIt = true;
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
    }

  }

})();