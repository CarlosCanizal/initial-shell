angular
  .module('app.cart')
  .directive('shippingAddress',shippingAddress);

shippingAddress.$inject = ['userApi'];

function shippingAddress(userApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/cart/checkout/shippingAddress/shippingAddress.template.html',
    scope: true,
    link:function(scope,element,attr){
      var shell = scope.shell;
      var checkout = scope.checkout;

      console.log('checkout', checkout);

      scope.loading = true;

      //checar por que no funciona
      checkout.cleanItemsUnavaibale();

      shell.shoppingCart.shippingAddress = false;
      checkout.addressFormView = false;

      //refactorizar con direcative en address
       scope.showAddressForm = function(show){
        scope.addressFormView = show;
      }

      userApi.getAddresses(shell.currentUser.objectId).then(function(addresses){
        scope.addresses =  addresses.results;
        if(scope.addresses[0])
          shell.shoppingCart.shippingAddress = scope.addresses[0];
        scope.loading = false;
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
      
    }
  }
}