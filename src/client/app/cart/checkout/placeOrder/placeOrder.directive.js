angular
  .module('app.cart')
  .directive('placeOrder',placeOrder);

placeOrder.$inject = ['userApi','ShoppingCart'];

function placeOrder(userApi, ShoppingCart){
  return{
    restrict: 'EA',
    templateUrl: 'app/cart/checkout/placeOrder/placeOrder.template.html',
    scope: true,
    link:function(scope,element,attr){
      // scope.showConfirmation = true;
      
      scope.placeOrder = function(){
        var user = scope.currentUser;
        var cart = ShoppingCart.getCart();
        scope.showConfirmation = true;
        scope.waitingForResponse = true;

        console.log(cart);
        

        userApi.chargeCard(cart, user).then(function(result){
          console.log(result.result);
          scope.emptyCart();
          scope.setStatus(true);
          scope.waitingForResponse = false;
        },function(error){
          console.log(error);
          var error = angular.fromJson(error.data.error);
          scope.setStatus(false);
          console.log(error);
          scope.errorMessage =  error.message_to_purchaser;
          scope.waitingForResponse = false;
        });
      }
    }
  }
}