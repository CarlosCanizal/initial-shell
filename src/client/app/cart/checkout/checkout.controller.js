(function() {
  'use strict';

  angular
  .module('app.cart')
  .controller('Checkout', Checkout);

  Checkout.$inject = ['$scope','$state','ShoppingCart'];

  function Checkout($scope, $state,ShoppingCart) {
    $scope.vm.cartItems = ShoppingCart.getCart();


    $scope.plusOne = function(item){
      ++item.quantity;
    }

    $scope.minusOne = function(item){
      if(item.quantity-1 > 0)
        --item.quantity;
    }

    $scope.updateQuantity = function(item, index){
      console.log(item);
      $scope.vm.cartItems = ShoppingCart.updateQuantity(item, index);
    }


  }



})();
