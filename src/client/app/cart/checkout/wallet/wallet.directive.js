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
      // var user = scope.getCurrentUser();
      var shell = scope.shell;
      scope.payWithWallet = false;

      if(shell.shoppingCart.useWallet && shell.currentUser && shell.currentUser.wallet > 0)
        scope.payWithWallet = true;        

      scope.useWallet = function(){
        scope.showLoading();
        scope.payWithWallet = true;
        shell.shoppingCart.useWallet = true;
        shell.shoppingCart.userWallet = scope.currentUser.wallet;
        ShoppingCart.setCart(cart);
        scope.hideLoading();
      }

      scope.doNotUseWallet = function(){
        scope.showLoading();
        var cart = ShoppingCart.getCart();
        scope.payWithWallet = false;
        shell.shoppingCart.useWallet = false;
        shell.shoppingCart.total = cart.cartTotal;
        shell.shoppingCart.wallet = 0;
        ShoppingCart.setCart(cart);
        scope.hideLoading();
      }
      
    }
  }
}