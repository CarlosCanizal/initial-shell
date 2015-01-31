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
      var checkout = scope.checkout;

      scope.payWithWallet = false;

      if(shell.shoppingCart.useWallet && shell.currentUser && shell.currentUser.wallet > 0)
        scope.payWithWallet = true;        

      scope.useWallet = function(){
        shell.showLoading();
        scope.payWithWallet = true;
        shell.shoppingCart.useWallet = true;
        shell.shoppingCart = ShoppingCart.setCart(shell.shoppingCart);
        shell.hideLoading();
      }

      scope.doNotUseWallet = function(){
        shell.showLoading();        
        scope.payWithWallet = false;
        shell.shoppingCart.useWallet = false;
        shell.shoppingCart.wallet = 0;
        shell.shoppingCart = ShoppingCart.setCart(shell.shoppingCart);
        shell.hideLoading();
      }
      
    }
  }
}