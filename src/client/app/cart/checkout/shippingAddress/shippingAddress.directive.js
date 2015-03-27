angular
  .module('app.cart')
  .directive('shippingAddress',shippingAddress);

shippingAddress.$inject = ['userApi', 'shippingApi'];

function shippingAddress(userApi, shippingApi){
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

      shippingApi.getList().then(function(result){
        checkout.shippingMethods = result.results;
        return userApi.getPlacedOrders();
      }).then(function(result){
        var orders = result.results;
        if(orders.length < 1){
          if(checkout.shippingMethods[0].label == 'group')
          checkout.shippingMethods.splice(0,1);
        }

        if(checkout.shippingMethods[0]){
          shell.shoppingCart.shippingMethod = checkout.shippingMethods[0];
        }

        return userApi.getAddresses(shell.currentUser.objectId)
      }).then(function(addresses){
        checkout.addresses =  addresses.results;
        if(checkout.addresses[0]){
          shell.shoppingCart.shippingAddress = checkout.addresses[0];
          checkout.updateShipping();
        }
      },function(error){
        shell.setError(error);
      }).finally(function(){
        scope.loading = false;        
      });
      
    }
  }
}