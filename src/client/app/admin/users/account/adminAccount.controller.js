(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('AdminAccount', AdminAccount);

  AdminAccount.$inject = ['$scope','$stateParams','userApi','conekta'];

  function AdminAccount($scope, $stateParams,userApi, conekta) {
    var shell = $scope.shell;
    var account = this;
    account.user = null;
    account.cardFormView = false;
    account.cancelFormView = false;
    account.upgradeView = false;
    //checar esta variable cards tal vez sea la misma que payment methods
    account.cards = [];
    account.subscription = {payment:false};
    $scope.loading = true;
    account.unsubscribe = {comment:null};

    var userId = $stateParams.userId;

    userApi.getUser(userId).then(function(user){
      account.user = user;
      return userApi.getCards({conektaId:user.conektaId});
    }).then(function(cards){
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
        var planId = conekta.getPlan();
        conekta.updateMembership({name:name,id: planId},account.subscription.payment, account.user).then(function(user){
          // shell.updateCurrentUser();
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

    account.updateUser = function(user){
      account.user = user;
    }
    
  }

})();
