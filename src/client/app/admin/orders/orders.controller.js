(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Orders', Orders);

  Orders.$inject = ['$scope','orderApi'];

  function Orders($scope, orderApi) {
    
    var shell = $scope.shell;
    var orders = this;
    var today = new Date();
    orders.startDate = today;
    orders.endDate = today;
    orders.list = [];
    shell.showLoading();

    orderApi.getAllOrders().then(function(result){
      console.log(result);
    },function(error){
      shell.setError();
    }).finally(shell.hideLoading);

    orders.getOrders = function(startDate, endDate){
      orderApi.getAllOrders({startDate:startDate, endDate: endDate}).then(function(result){
        console.log(result);
      },function(error){
        shell.setError();
      }).finally(shell.hideLoading);
    }

  }

})();
