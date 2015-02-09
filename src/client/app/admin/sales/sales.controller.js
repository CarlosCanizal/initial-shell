(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Sales', Sales);

  Sales.$inject = ['$scope','salesApi'];

  function Sales($scope, salesApi) {
    var shell = $scope.shell;
    var sales = this;
    var today = new Date();
    sales.startDate = today;
    sales.endDate = today;
    sales.orders = [];
    sales.total = 0;

    sales.getSales = function(startDate, endDate){
      shell.showLoading();
      salesApi.getSales({startDate:startDate, endDate:endDate}).then(function(result){
        var result = result.result;
        console.log(result);
        sales.orders = result.orders;
        sales.total = result.total;
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading)
    } 
  }

})();
