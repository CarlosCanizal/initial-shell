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
      checkout.cleanItemsUnavaibale();
      checkout.addressFormView = false;
      scope.loading = true;

       scope.showAddressForm = function(show){
        checkout.addressFormView = show;
      }

      userApi.getAddresses(shell.currentUser.objectId).then(function(addresses){
        checkout.addresses =  addresses.results;
        if(checkout.addresses[0]){
          shell.shoppingCart.shippingAddress = checkout.addresses[0];
        }
      },function(error){
        shell.setError(error);
      }).finally(function(){
        scope.loading = false;        
      });
      
    }
  }
}