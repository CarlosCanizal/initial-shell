angular
  .module('app.cart')
  .directive('paymentMethod',paymentMethod);

paymentMethod.$inject = ['userApi'];

function paymentMethod(userApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/cart/checkout/paymentMethod/paymentMethod.template.html',
    scope: true,
    link:function(scope,element,attr){
      var shell = scope.shell;
      var checkout =  scope.checkout;

      scope.loading = true;
      shell.shoppingCart.paymentMethod = false;

      userApi.getCards({conektaId:shell.currentUser.conektaId}).then(function(cards){
        if(checkout && checkout.paymentMethods){
          var methods = userApi.getAltPayment(cards);
          checkout.setMethods(methods);
          shell.shoppingCart.paymentMethod = checkout.paymentMethods[0];
        } 
      },function(error){
        shell.setError(error);
      }).finally(function(){
        scope.loading = false;
      });

      checkout.showCardForm = function(show){
        checkout.cardFormView = show;
      }
    }
  }
}