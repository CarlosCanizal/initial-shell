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

    $scope.saveProfile = function(){
      shell.showLoading();
      var sessionToken = profile.user.sessionToken;
      userApi.saveProfile(profile.user).then(function(user){
        //siempre que se actualize el user debe ir updateCurrentUser();
        shell.updateCurrentUser();
      },function(error){
        console.error(error);
      }).finally(shell.hideLoading);
    }
    
  }

})();
