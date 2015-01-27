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

        var total = (cart.cartTotal - wallet) >=0 ? cart.cartTotal - wallet : 0;
        var walletTotal = (wallet - cart.cartTotal) >= 0 ? cart.cartTotal : 0;

        console.log('total', total);
        console.log('wallet', walletTotal);

        cart.total = total;
        cart.wallet = walletTotal;
        cart.useWallet = true;
        ShoppingCart.setCart(cart);
        scope.shoppingCart = cart;
        scope.hideLoading();
      }

      scope.doNotUseWallet = function(){
        scope.payWithWallet = false;
      }
      
    }
  }
}