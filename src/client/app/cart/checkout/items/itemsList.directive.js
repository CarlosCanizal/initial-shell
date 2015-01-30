// (function() {
//   'use strict';

angular
  .module('app.cart')
  .directive('itemsList',itemsList);

itemsList.$inject = ['ShoppingCart'];

function itemsList(ShoppingCart){
  return{
    restrict: 'EA',
    templateUrl: 'app/cart/checkout/items/items.template.html',
    scope: true,
    link:function(scope,element,attr){
      var checkout = scope.checkout;
      
      scope.loading = true;

      ShoppingCart.validateOrder().then(function(order){
        scope.vm.shoppingCart = ShoppingCart.updateItems(order.itemsAvailable);
        scope.itemsUnavailable = order.itemsUnavailable;
        scope.loading = false;
      },function(error){
        console.error(error);
      });

      scope.updateQuantity = function(item, index){
        scope.vm.cartItems = ShoppingCart.setCart(scope.vm.cartItems);
        scope.shoppingCart = scope.vm.cartItems;
        scope.setUpdateCart(false);
      }

    }
  }
}

// });