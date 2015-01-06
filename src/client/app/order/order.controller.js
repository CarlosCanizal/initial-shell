(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Order', Order);

  Order.$inject = ['$scope', '$stateParams', 'orderApi'];

  function Order($scope, $stateParams, orderApi) {

    var objectId = $stateParams.objectId;

    orderApi.getOrder(objectId).then(function(order){
      console.log(order);
    },function(error){
      console.log(error);
    });
    
  }

})();