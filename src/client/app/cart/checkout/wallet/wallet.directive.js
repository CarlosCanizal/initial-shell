angular
  .module('app.cart')
  .directive('wallet',wallet);

wallet.$inject = ['userApi', 'ShoppingCart'];

function wallet(userApi, ShoppingCart){
  return{
    restrict: 'EA',
    templateUrl: 'app/cart/checkout/wallet/wallet.template.html',
    scope: true,
    link:function(scope,element,attr){
      var user = scope.getCurrentUser();
      scope.payWithWallet = false;

      if(scope.shoppingCart.useWallet && user.wallet > 0)
        scope.payWithWallet = true;        

      scope.useWallet = function(){
        scope.showLoading();
        var cart = ShoppingCart.getCart();
        var wallet = user.wallet;
        scope.payWithWallet = true;
        cart.useWallet = true;
        cart.userWallet = scope.getCurrentUser().wallet;
        scope.updateShoppingCart(ShoppingCart.setCart(cart));
        scope.hideLoading();
      }

      scope.doNotUseWallet = function(){
        scope.showLoading();
        var cart = ShoppingCart.getCart();
        scope.payWithWallet = false;
        cart.useWallet = false;

        cart.total = cart.cartTotal;
        cart.wallet = 0;
        ShoppingCart.setCart(cart);
        scope.shoppingCart.total =  cart.total;
        scope.shoppingCart.wallet =  cart.wallet;
        scope.shoppingCart.useWallet =  false;
        scope.hideLoading();
      }
      
    }
  }
}