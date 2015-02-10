(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Users', Users);

  Users.$inject = ['$scope','userApi', 'orderApi'];

  function Users($scope, userApi, orderApi) {
    var shell = $scope.shell;
    var users =  this;
    shell.showLoading();
    users.list = [];
    users.buyers = [];
    users.notBuyers = [];
    var today = new Date();
    users.memberships = ['any','basic', 'pro'];
    users.membership = 'any';
    users.startDate = today;
    users.endDate = today;

    userApi.getAllUsers().then(function(result){
      users.list = result.results;
      var query = getBuyers(users.list);
      users.buyers = query.buyers;
      users.notBuyers = query.notBuyers;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);

    users.search = function(startDate, endDate, membership){
      shell.showLoading();
      var params = {startDate: startDate, endDate: endDate};

      if(membership)
        params.membership = membership;

      userApi.getAllUsers(params).then(function(result){
        users.list = result.results;
        var query = getBuyers(users.list);
        users.buyers = query.buyers;
        users.notBuyers = query.notBuyers;
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    }

    function getBuyers(users){
      var usersList = {buyers:[], notBuyers:[]};
      angular.forEach(users, function(user){
        if(user.isBuyer)
          usersList.buyers.push(user);
        else
          usersList.notBuyers.push(user);
      });
      return usersList;
    }


  }

})();
