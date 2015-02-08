(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Profile', Profile);

  Profile.$inject = ['$scope','userApi'];

  function Profile($scope, userApi) {
    var shell = $scope.shell;
    var profile = this; 

    profile.user = shell.currentUser;
    profile.newPassword = null;
    profile.oldPassword = null;

    $scope.saveProfile = function(){
      shell.showLoading();
      // var sessionToken = profile.user.sessionToken;
      userApi.saveProfile(profile.user).then(function(user){
        //siempre que se actualize el user debe ir updateCurrentUser();
        shell.updateCurrentUser();
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    }

    $scope.updatePassword = function(){
      shell.showLoading();
      var oldPassword = profile.oldPassword;
      var newPassword = profile.newPassword;
      userApi.updatePassword(profile.user,oldPassword, newPassword).then(function(user){
        shell.setMessage('Contraseña actualizada con exito');
        shell.updateCurrentUser();
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    }
    
  }

})();
