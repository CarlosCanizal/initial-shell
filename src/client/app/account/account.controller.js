(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Account', Account);

  Account.$inject = ['$scope','$state','userApi','conekta'];

  function Account($scope, $state,userApi, conekta) {

    $scope.currentUser = userApi.currentUser();
    var currentUser = userApi.currentUser();
    $scope.cardFormView = false;
    $scope.cancelFormView = false;
    $scope.upgradeView = false;
    // $scope. paymentMethods = [];
    $scope.cards = [];
    $scope.subscription = {payment:{}};
    $scope.loading = true;
    $scope.unsubscribe = {comment:null};


    userApi.getCards({conektaId:$scope.currentUser.conektaId}).then(function(cards){
      $scope.cards = cards;
      if(currentUser.subscriptionCard){
        
        angular.forEach(cards,function(value){
          if(angular.equals(currentUser.subscriptionCard,value)){
            $scope.subscription.payment = value;
          }
        });

      }else{
        console.log('out');
        $scope.subscription.payment = $scope.cards[0];
      }
    },function(error){
      console.log(error);
    }).finally(function(){
      $scope.loading = false;
    });

    $scope.updateCard = function(){
      if($scope.subscription.payment){
        $scope.showLoading();
        conekta.subscriptionCard($scope.subscription.payment).then(function(user){
          console.log(user);
          $scope.updateCurrentUser();
        },function(error){
          console.log(error);
        }).finally($scope.hideLoading);
      }
    }

    $scope.addCard = function(card){
      $scope.subscription.payment = card;
    }
    
    $scope.updateMembership = function(name){
      if($scope.subscription.payment){
        $scope.showLoading();
        conekta.updateMembership({name:name,id:'plan_CczxCcuzBBUew3Vm'},$scope.subscription.payment).then(function(user){
          $scope.updateCurrentUser();
        },function(error){
          console.log(error);
        }).finally($scope.hideLoading);
      }
    }



    $scope.showCardForm = function(view){
      $scope.cardFormView  = view;
    }

    $scope.showCancelForm = function(){
      $scope.cancelFormView = true;
    }

    $scope.hideCancelForm = function(){
      $scope.cancelFormView = false;
    }

    $scope.showUpgrade = function(){
      $scope.upgradeView = true;
    }

    $scope.hideUpgrade = function(){
      $scope.upgradeView = false;
    }
    
  }

})();
