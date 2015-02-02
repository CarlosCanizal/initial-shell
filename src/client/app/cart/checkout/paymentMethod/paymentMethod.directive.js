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
        //checar que onda con esta variable cards
        checkout.cards = cards;
        checkout.paymentMethods =  checkout.cards;
        if(checkout.cards[0])
          shell.shoppingCart.paymentMethod = checkout.cards[0];
        scope.loading = false;
      },function(error){
        console.error(error);
      });

      checkout.showCardForm = function(show){
        checkout.cardFormView = show;
      }
    }
  }
}