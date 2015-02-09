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
    sales.result = {};

    shell.showLoading();
    salesApi.getSales().then(function(result){
      console.log(result);
      var result = result.result;
      sales.result = result;
    },function(){
      shell.setError(error);
    }).finally(shell.hideLoading);




    sales.getSales = function(startDate, endDate){
      shell.showLoading();
      salesApi.getSales({startDate:startDate, endDate:endDate}).then(function(result){
        var result = result.result;
        sales.result = result;
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading)
    }

  }

})();
