(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Assistent', Assistent);

  Assistent.$inject = ['$scope','$state','$stateParams', 'userApi'];

  function Assistent($scope,$state, $stateParams, userApi){

    var shell = $scope.shell;
    var assistent =  this;
    assistent.response = {};

    assistent.register = function(){
        assistent.response.register = false;
        if(assistent.registerForm.$valid){
          shell.showLoading();
          userApi.assistentRegister($scope.newUser).then(function(user){
            $state.go('admin.assistentUser', {userId:user.objectId});
          },function(error){
            if(error.data.error){
              assistent.response.register = error.data.error;
            }else{
              shell.setError(error);
            }
          }).finally(shell.hideLoading);
        }else{
          assistent.registerForm.name.$setDirty();
          assistent.registerForm.lastname.$setDirty();
          assistent.registerForm.username.$setDirty();
          assistent.registerForm.password.$setDirty();
        }
      };
  }

})();
