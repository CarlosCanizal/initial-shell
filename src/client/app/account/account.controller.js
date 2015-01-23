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
    $scope. paymentMethods = [];
    $scope.cards = [];
    $scope.subscription = {payment:null};
    $scope.loading = true;


    userApi.getCards({conektaId:$scope.currentUser.conektaId}).then(function(cards){
      $scope.cards = cards;
      $scope.subscription.payment = $scope.cards[0];
    },function(error){
      console.log(error);
    }).finally(function(){
      $scope.loading = false;
    });

    $scope.updateCard = function(card){
      $scope.subscription.payment = card;
    }
    
    $scope.updateMembership = function(name){
      $scope.showLoading();
      conekta.updateMembership({name:name,id:'plan_CczxCcuzBBUew3Vm'},$scope.subscription.payment.card.id).then(function(user){
        $scope.updateCurrentUser();
      },function(error){
        console.log(error);
      }).finally($scope.hideLoading);
    }

    $scope.cancelMembership =  function(){
      $scope.showLoading();
      conekta.unsubscribe('plan_CczxCcuzBBUew3Vm').then(function(user){
        console.log(user);
        $scope.updateCurrentUser();
      },function(error){
        console.log(error);
      }).finally($scope.hideLoading);
    }

    $scope.showCardForm = function(view){
      $scope.cardFormView  = view;
    }
    
  }

})();
