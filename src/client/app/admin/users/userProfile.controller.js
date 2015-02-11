(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('UserProfile', UserProfile);

  UserProfile.$inject = ['$scope','$stateParams','userApi', 'orderApi'];

  function UserProfile($scope,$stateParams, userApi, orderApi) {
    var shell = $scope.shell;
    var profile =  this;
    var userId = $stateParams.objectId;

    shell.showLoading();
    userApi.getUser(userId).then(function(result){
      profile.user = result;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);
    
  }

})();
