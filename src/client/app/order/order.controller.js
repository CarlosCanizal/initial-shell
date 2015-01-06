(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Order', Order);

  Order.$inject = ['$scope', 'orderApi'];

  function Order($scope, orderApi) {

    $scope.orders = [];
    $scope.loading =  true;


    orderApi.getOrders().then(function(result){
      console.log(result.results);
      $scope.orders = result.results;
      $scope.loading =  false;
    },function(error){
      console.error(error);
    });
  }

})();