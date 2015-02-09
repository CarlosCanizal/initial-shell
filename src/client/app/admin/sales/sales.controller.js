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


    sales.getSales = function(startDate, endDate){
      salesApi.getSales({startDate:startDate, endDate:endDate}).then(function(result){
        console.log(result);
      },function(error){
        shell.setError(error);
      }).finally(function(){

      })
    } 
  }

})();
