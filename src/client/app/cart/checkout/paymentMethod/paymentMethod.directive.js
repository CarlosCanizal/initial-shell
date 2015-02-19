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
        // if(checkout && checkout.cards){
          // checkout.cards = cards;
          // shell.shoppingCart.paymentMethod = checkout.cards[0];
        // }
        if(checkout && checkout.paymentMethods){
          checkout.setMethods(cards);
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