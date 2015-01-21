(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Account', Account);

  Account.$inject = ['$scope','$state','userApi','conekta'];

  function Account($scope, $state,userApi, conekta) {

    // $scope.currentUser = userApi.currentUser();
    $scope.currentUser = userApi.currentUser();
    $scope.cardFormView = false;
    $scope. paymentMethods = [];
    $scope.cards = [];
    $scope.subscription = {payment:null};


    $scope.updateCard = function(card){
      $scope.subscription.payment = card;
    }
    
    $scope.updateMembership = function(name){
      conekta.updateMembership({name:name,id:'plan_CczxCcuzBBUew3Vm'},$scope.subscription.payment.card.id).then(function(user){
        console.log(user);
        $scope.updateCurrentUser();
      },function(error){
        console.log(error);
      });
    }

    $scope.showCardForm = function(view){
      $scope.cardFormView  = view;
    }
    
  }

})();
