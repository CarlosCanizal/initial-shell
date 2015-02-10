(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Users', Users);

  Users.$inject = ['$scope','userApi'];

  function Users($scope, userApi) {
    var shell = $scope.shell;
    var users =  this;
    shell.showLoading();
    users.list = [];

    userApi.getAllUsers().then(function(result){
      users.list = result.results;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);


  }

})();
