(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('AdminOrders', AdminOrders);

  AdminOrders.$inject = ['$scope','$stateParams','orderApi'];

  function AdminOrders($scope, $stateParams, orderApi) {
    
    var shell = $scope.shell;
    var orders = this;
    var today = new Date();
    var params = {};
    orders.startDate = today;
    orders.endDate = today;
    orders.list = [];
    shell.showLoading();

    if($stateParams.userId){
      orders.byUser = true
      params.userId =  $stateParams.userId;
    }

    orderApi.getAllOrders(params).then(function(result){
      orders.list = result.results;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);

    orders.getOrders = function(startDate, endDate){
      params.startDate = startDate;
      params.endDate = endDate;
      orderApi.getAllOrders(params).then(function(result){
        orders.list = result.results;
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    }

  }

})();
