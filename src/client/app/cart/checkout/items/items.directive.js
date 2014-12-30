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
      scope.loading = true;

      ShoppingCart.validateOrder().then(function(order){
        scope.vm.cartItems = ShoppingCart.updateItems(order.itemsAvailable);
        scope.itemsUnavailable = order.itemsUnavailable;
        scope.loading = false;
      },function(error){
        console.error(error);
      });

      scope.plusOne = function(item){
        console.log(item.stock);
        if(item.type == 'available'){
          if(item.quantity+1 <= item.stock)
            ++item.quantity;
        }
        else
          ++item.quantity;
      }

      scope.minusOne = function(item){
        if(item.quantity-1 > 0)
          --item.quantity;
      }

      scope.updateQuantity = function(item, index){
        if(item.quantity > item.stock){
          item.quantity = item.stock;
        }
        else{
          $scope.vm.cartItems = ShoppingCart.setCart($scope.vm.cartItems);
          $scope.shoppingCart.items = $scope.vm.cartItems.items;
        }
      }
    }
  }
}

// });