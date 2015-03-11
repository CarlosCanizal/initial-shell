(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('AssistentUser', AssistentUser);

  AssistentUser.$inject = ['$scope','$stateParams', 'userApi','user','conekta'];

  function AssistentUser($scope, $stateParams, userApi, user, conekta){

    var shell = $scope.shell;
    var assistentUser =  this;
    assistentUser.user = user;
    assistentUser.cardFormView = true;
    assistentUser.subscription ={};
    assistentUser.subscription.payment = null;
    assistentUser.cards = [];
    assistentUser.paymentMethod = 'card'

    shell.showLoading();
    userApi.getCards({conektaId: assistentUser.user.conektaId}).then(function(cards){
      assistentUser.cards = cards;
      assistentUser.subscription.payment = cards[0];
      assistentUser.cardFormView = false;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);

    assistentUser.showCardForm = function(view){
      assistentUser.cardFormView = view;
    }

    assistentUser.updateMembership = function(name){
      if(assistentUser.subscription.payment){
        shell.showLoading();
        conekta.updateMembership({name:name,id:'plan_CczxCcuzBBUew3Vm'},assistentUser.subscription.payment, assistentUser.user).then(function(result){
          assistentUser.user.membership = result.result.membership;
          assistentUser.user.subscriptionCard = result.result.subscriptionCard;
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
    };

    assistentUser.updateCash = function(){
      shell.showLoading();
      userApi.saveUserProfile({objectId: assistentUser.user.objectId,membership:'pro',upgrade:'upgraded'}).then(function(result){
        assistentUser.user.membership = result.result.membership;
        assistentUser.user.subscriptionCard = result.result.subscriptionCard;
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    };
    
  }
})();
