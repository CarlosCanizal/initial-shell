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
      var paymentMethod;

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
                            exp_month: '05',
                            exp_year: '2015'
                           };

      scope.hideCardForm = function(){
        paymentMethod.showCardForm(false);
      }

      scope.saveCard = function(){
        shell.showLoading();
        conekta.saveCard(shell.currentUser.conektaId,scope.card).then(function(card){
          var newCard = {type:'card', card:card};

          if(paymentMethod && paymentMethod.cards){
            paymentMethod.cards.push(newCard);
            
            if(paymentMethod.subscription)
              paymentMethod.subscription.payment = newCard;
          }

          if(checkout && shell.shoppingCart){
            shell.shoppingCart.paymentMethod = newCard;
          }

          paymentMethod.showCardForm(false);
        },function(error){
          if(error.status)
            console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
          else
            console.error(error);
        }).finally(shell.hideLoading);
      };
    }
  }
}