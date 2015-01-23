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
    $scope. paymentMethods = [];
    $scope.cards = [];
    $scope.subscription = {payment:null};
    $scope.loading = true;
    $scope.unsubscribe = {comment:null};


    userApi.getCards({conektaId:$scope.currentUser.conektaId}).then(function(cards){
      $scope.cards = cards;
      $scope.subscription.payment = $scope.cards[0];
    },function(error){
      console.log(error);
    }).finally(function(){
      $scope.loading = false;
    });

    $scope.updateCard = function(card){
      if($scope.subscription.payment){
        $scope.showLoading();
        conekta.subscriptionCard($scope.subscription.payment.card.id).then(function(user){
          // $scope.subscription.payment
        },function(error){
          console.log(error);
        }).finally($scope.hideLoading);
      }
    }
    
    $scope.updateMembership = function(name){
      if($scope.subscription.payment){
        $scope.showLoading();
        conekta.updateMembership({name:name,id:'plan_CczxCcuzBBUew3Vm'},$scope.subscription.payment.card.id).then(function(user){
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
    
  }

})();
