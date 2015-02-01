(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Order', Order);

  Order.$inject = ['$scope', '$stateParams', 'orderApi'];

  function Order($scope, $stateParams, orderApi) {
    var shell = $scope.shell;
    var order = this;

    var objectId = $stateParams.objectId;
    $scope.loading = true;

    orderApi.getOrder(objectId).then(function(result){
      order.info = result;
      $scope.loading = false;
    },function(error){
      console.log(error);
    });
    
  }

})();