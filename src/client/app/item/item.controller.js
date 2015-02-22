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
      if(item.info.available == 'available'){
        if(item.quantity+1 <= item.info.stock){
          item.quantity +=1;
        }
      }
      else{
        item.quantity +=1;
      }
    }

    item.minusOne = function(){
      if(item.quantity > 1)
        item.quantity -=1;
    }
    


    
  }

})();
