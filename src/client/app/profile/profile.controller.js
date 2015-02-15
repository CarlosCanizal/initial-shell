(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Profile', Profile);

  Profile.$inject = ['$scope','$stateParams','userApi'];

  function Profile($scope, $stateParams, userApi){
    var shell = $scope.shell;
    var profile = this;
    var view = $scope.view;

    if(view){
      profile.user = view.user;
    }
    else{
      profile.user = shell.currentUser;
      profile.newPassword = null;
      profile.oldPassword = null;
    }

    profile.updatePassword = function(){
      if($scope.passwordForm.$valid){
        shell.showLoading();
        var oldPassword = profile.oldPassword;
        var newPassword = profile.newPassword;
        userApi.updatePassword(profile.user,oldPassword, newPassword).then(function(user){
          shell.setMessage('Contraseña actualizada con exito');
          profile.newPassword = null;
          profile.oldPassword = null;
          $scope.passwordMatch = null;
          $scope.passwordForm.$setPristine();
          shell.updateCurrentUser();
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
    }
    
  }

})();
