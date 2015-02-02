(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Order', Order);

  Order.$inject = ['$scope', '$stateParams', 'orderApi'];

  function Order($scope, $stateParams, orderApi) {
    var shell = $scope.shell;
    var order = this;

    if($stateParams.objectId){
      var objectId = $stateParams.objectId;
      $scope.loading = true;

      orderApi.getOrder(objectId).then(function(result){
        order.info = result;
      },function(error){
        console.log(error);
      }).finally(function(){
        $scope.loading = false
      });
    }else if($scope.order){
      order.info = $scope.order;
    }
    
  }

})();