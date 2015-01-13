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
      scope.loading = true;
      scope.shoppingCart.paymentMethod = false;
      userApi.getCards({conektaId:scope.currentUser.conektaId}).then(function(cards){
        scope.cards = cards;
        scope.paymentMethods =  scope.cards;
        if(scope.cards[0])
          scope.shoppingCart.paymentMethod = scope.cards[0];
        scope.loading = false;
      },function(error){
        console.error(error);
      });

      scope.showCardForm = function(show){
        scope.cardFormView = show;
      }
    }
  }
}