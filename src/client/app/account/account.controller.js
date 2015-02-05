(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Account', Account);

  Account.$inject = ['$scope','$state','userApi','conekta'];

  function Account($scope, $state,userApi, conekta) {
    var shell = $scope.shell;
    var account = this;

    account.cardFormView = false;
    account.cancelFormView = false;
    account.upgradeView = false;
    //checar esta variable cards tal vez sea la misma que payment methods
    account.cards = [];
    account.subscription = {payment:false};
    $scope.loading = true;
    account.unsubscribe = {comment:null};


    userApi.getCards({conektaId:shell.currentUser.conektaId}).then(function(cards){
      account.cards = cards;
      
      if(shell.currentUser.subscriptionCard){
        var flag = true;
        angular.forEach(cards,function(value){
          if(angular.equals(shell.currentUser.subscriptionCard,value)){
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
        conekta.updateMembership({name:name,id:'plan_CczxCcuzBBUew3Vm'},account.subscription.payment).then(function(user){
          shell.updateCurrentUser();
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
    }

    account.showCardForm = function(view){
      account.cardFormView  = view;
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
    
  }

})();
