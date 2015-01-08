(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Order', Order);

  Order.$inject = ['$scope', '$stateParams', 'orderApi'];

  function Order($scope, $stateParams, orderApi) {

    var objectId = $stateParams.objectId;
    $scope.order;
    $scope.loading = true;

    orderApi.getOrder(objectId).then(function(order){
      console.log(order);
      $scope.order = order;
      $scope.loading = false;
    },function(error){
      console.log(error);
    });
    
  }

})();