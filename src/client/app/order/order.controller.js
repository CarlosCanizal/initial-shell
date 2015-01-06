(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Order', Order);

  Order.$inject = ['$scope', 'orderApi'];

  function Order($scope, orderApi) {

    $scope.orders = [];


    orderApi.getOrders().then(function(result){
      console.log(result.results);
      $scope.orders = result.results;
    },function(error){
      console.error(error);
    });
  }

})();