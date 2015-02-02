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
      scope.loading = true;

      checkout.cleanItemsUnavaibale();

      // shell.shoppingCart.shippingAddress = false;
      checkout.addressFormView = false;

      //refactorizar con direcative en address
       scope.showAddressForm = function(show){
        checkout.addressFormView = show;
      }

      userApi.getAddresses(shell.currentUser.objectId).then(function(addresses){
        checkout.addresses =  addresses.results;
        if(checkout.addresses[0]){
          shell.shoppingCart.shippingAddress = checkout.addresses[0];
          console.log('done!');
        }
        scope.loading = false;
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
      
    }
  }
}