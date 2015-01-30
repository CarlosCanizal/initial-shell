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

      if(scope.shoppingCart.useWallet && user && user.wallet > 0)
        scope.payWithWallet = true;        

      scope.useWallet = function(){
        scope.showLoading();
        var cart = ShoppingCart.getCart();
        scope.payWithWallet = true;
        cart.useWallet = true;
        cart.userWallet = scope.currentUser.wallet;
        scope.updateWallet(ShoppingCart.setCart(cart));
        scope.hideLoading();
      }

      scope.doNotUseWallet = function(){
        scope.showLoading();
        var cart = ShoppingCart.getCart();
        scope.payWithWallet = false;
        cart.useWallet = false;
        cart.total = cart.cartTotal;
        cart.wallet = 0;
        scope.updateWallet(ShoppingCart.setCart(cart));
        scope.hideLoading();
      }
      
    }
  }
}