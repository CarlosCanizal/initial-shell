(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Account', Account);

  Account.$inject = ['$scope','$state','userApi','conekta'];

  function Account($scope, $state,userApi, conekta) {
    var shell = $scope.shell;
    var view = $scope.view;
    var account = this;

    account.cardFormView = false;
    account.cancelFormView = false;
    account.upgradeView = false;
    //checar esta variable cards tal vez sea la misma que payment methods
    account.cards = [];
    account.subscription = {payment:false};
    $scope.loading = true;
    account.unsubscribe = {comment:null};

    if(view)
      account.user = view.user;
    else
      account.user = shell.currentUser;


    userApi.getCards({conektaId:account.user.conektaId}).then(function(cards){
      account.cards = cards;
      
      if(account.user.subscriptionCard){
        var flag = true;
        angular.forEach(cards,function(value){
          if(angular.equals(account.user.subscriptionCard,value)){
            account.subscription.payment = value;
            flag = false;
          }
        });
        if(flag)
          account.subscription.payment = account.cards[0];
      }else{
        account.subscription.payment = account.cards[0];
      }
    },function(error){
      shell.setError(error);
    }).finally(function(){
      $scope.loading = false;
    });

    account.updateCard = function(){
      if(account.subscription.payment){
        shell.showLoading();
        conekta.subscriptionCard(account.subscription.payment).then(function(user){
          if(!view)
            shell.updateCurrentUser();
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
    }

    account.addCard = function(card){
      account.subscription.payment = card;
    }
    
    account.updateMembership = function(name){
      if(account.subscription.payment){
        shell.showLoading();
        conekta.updateMembership({name:name,id:'plan_CczxCcuzBBUew3Vm'},account.subscription.payment, account.user).then(function(result){
          if(!view){
            shell.updateCurrentUser();
          }
          account.user = result.result;
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
    }

    account.showCardForm = function(viewForm){
      account.cardFormView  = viewForm;
    }

    account.showCancelForm = function(){
      account.hideUpgrade();
      account.cancelFormView = true;
    }

    account.hideCancelForm = function(){
      account.cancelFormView = false;
    }

    account.showUpgrade = function(){
      account.upgradeView = true;
    }

    account.hideUpgrade = function(){
      account.upgradeView = false;
    }

    account.updateUser = function(user){
      account.user = user;
    }
    
  }

})();
