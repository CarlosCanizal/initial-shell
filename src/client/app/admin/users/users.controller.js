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
    var today = new Date();
    users.memberships = ['any','basic', 'pro'];
    users.membership = 'any';
    // users.startDate = today;
    // users.endDate = today;

    userApi.getAllUsers().then(function(result){
      users.list = result.results;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);

    users.search = function(startDate, endDate, membership){

      var params = {startDate: startDate, endDate: endDate};

      if(membership)
        params.membership = membership;

      userApi.getAllUsers(params).then(function(result){
        users.list = result.results;
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    }


  }

})();
