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
      var shell = scope.shell;
      var checkout =  scope.checkout;
      
      scope.placeOrder = function(){
        var cart = ShoppingCart.getCart();

        checkout.showConfirmation = true;
        scope.waitingForResponse = true;
        scope.order = {}

        scope.changePaymentMethod = function(){
          checkout.showConfirmation = false;
          checkout.toPaymentMethod();
        }

        userApi.chargeCard(cart, shell.currentUser).then(function(result){
          scope.order.info = result.result;
          checkout.emptyCart();
          checkout.setStatus(true);
          shell.updateCurrentUser();
        },function(error){
          var error = angular.fromJson(error.data.error);
          checkout.setStatus(false);
          if(error.message_to_purchaser){
            scope.errorMessage =  error.message_to_purchaser;
          }else{
            shell.setError(error);
          }
        }).finally(function(){
          scope.waitingForResponse = false;          
        });
      }
    }
  }
}