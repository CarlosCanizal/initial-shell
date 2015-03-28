angular
  .module('app.cart')
  .directive('upgradeMembership',upgradeMembership);

upgradeMembership.$inject = ['userApi','conekta'];

function upgradeMembership(userApi, conekta){
  return{
    restrict: 'EA',
    templateUrl: 'app/membership/upgrade.template.html',
    scope: true,
    link:function(scope,element,attr){
      var shell = scope.shell;
      var checkout =  scope.checkout;

      scope.loading = true;
      shell.shoppingCart.paymentMethod = false;

      userApi.getCards({conektaId:shell.currentUser.conektaId}).then(function(cards){
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

      checkout.updateMembership = function(name){
      if(shell.shoppingCart.paymentMethod){
        shell.showLoading();
        var planId = conekta.getPlan();
        console.log(shell.shoppingCart.paymentMethod);
        conekta.updateMembership({name:name,id: planId},shell.shoppingCart.paymentMethod,shell.currentUser).then(function(result){          
          shell.updateCurrentUser().then(function(){
            checkout.upgrade = false;
          });
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
    };



    }
  }
}