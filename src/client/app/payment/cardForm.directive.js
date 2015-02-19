angular
  .module('app.cart')
  .directive('cardForm',cardForm);

cardForm.$inject = ['userApi','conekta'];

function cardForm(userApi, conekta){
  return{
    restrict: 'EA',
    templateUrl: 'app/payment/card.form.html',
    scope: true,
    link:function(scope,element,attr){
      var shell = scope.shell;
      var view = scope.view;
      var paymentMethod;

      scope.months = [];
      for(var i=1; i<=12; i++){
        scope.months.push(i);
      }

      scope.years = [];
      for(var j=2015; j<=2030; j++){
        scope.years.push(j);
      }

      if(scope.payment){
        paymentMethod = scope.payment;
      }
      else if(scope.account){
        paymentMethod = scope.account;
      }
      else if(scope.checkout){
        paymentMethod = scope.checkout;
        var checkout = scope.checkout;
      }

      scope.card = {name:'Javier Pedreiro',
                            number: '4242424242424242',
                            cvc: '123',
                            exp_month: scope.months[0],
                            exp_year: scope.years[0]
                           };

      scope.hideCardForm = function(){
        paymentMethod.showCardForm(false);
      }

      if(attr.conektaId){
        scope.conektaId = attr.conektaId;
      }
      else{
        scope.conektaId = view && view.user ? view.user.conektaId :shell.currentUser.conektaId;
      }

      scope.saveCard = function(conektaId){
        shell.showLoading();
        conekta.saveCard(conektaId,scope.card).then(function(card){
          var newCard = {type:'card', card:card};

          if(paymentMethod && paymentMethod.cards){
            paymentMethod.cards.push(newCard);
            
            if(paymentMethod.subscription)
              paymentMethod.subscription.payment = newCard;
          }

          if(checkout && shell.shoppingCart){
            checkout.paymentMethods.push(newCard);
            shell.shoppingCart.paymentMethod = newCard;
          }

          paymentMethod.showCardForm(false);
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      };
    }
  }
}