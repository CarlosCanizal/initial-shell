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
      var shell = scope.shell;
      var checkout = scope.checkout;
      
      scope.loading = true;

      ShoppingCart.validateOrder().then(function(order){
        shell.shoppingCart = ShoppingCart.updateItems(order.itemsAvailable);
        checkout.itemsUnavailable = order.itemsUnavailable;
        scope.loading = false;
      },function(error){
        console.error(error);
      });

      checkout.updateQuantity = function(item, index){
        shell.shoppingCart = ShoppingCart.setCart(shell.shoppingCart);
        checkout.updateCart = false;
      }

    }
  }
}