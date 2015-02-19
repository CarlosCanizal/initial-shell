(function() {
  'use strict';

  angular
  .module('app.cart')
  .controller('Item', Item);

  Item.$inject = ['$scope','info'];

  function Item($scope, info) {
    var shell = $scope.shell
    var item = this;
    item.info = info;
    item.quantity = 1;

    item.plusOne = function(){
      item.quantity +=1;
    }

    item.minusOne = function(){
      if(item.quantity > 1)
        item.quantity -=1;
    }
    


    
  }

})();
