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
      scope.loading = true;
      scope.cleanItemsUnavaibale();
      userApi.getAddresses(scope.currentUser.objectId).then(function(addresses){
        scope.addresses =  addresses.results;
        scope.shoppingCart.shippingAddress = scope.addresses[0];
        scope.loading = false;
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }
  }
}