(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Orders', Orders);

  Orders.$inject = ['$scope', 'orderApi'];

  function Orders($scope, orderApi) {
    var shell = $scope.shell;
    var orders  = this;

    orders.list = [];
    $scope.loading =  true;

    orderApi.getOrders().then(function(result){
      orders.list = result.results;
    },function(error){
      shell.setError(error);
    }).finally(function(){
      $scope.loading =  false;
    });
  }

})();