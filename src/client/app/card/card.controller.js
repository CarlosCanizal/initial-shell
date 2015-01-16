(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Card', Card);

  Card.$inject = ['$scope','userApi','conekta'];

  function Card($scope, userApi, conekta) {

    // $scope.card = {};
    $scope.currentUser = $scope.getCurrentUser();

    $scope.cards = [];
    $scope.cardFormView  = false;
    $scope.loading = true;

    userApi.getCards({conektaId:$scope.currentUser.conektaId}).then(function(cards){
        console.log(cards);
        $scope.loading = false;
        $scope.cards = cards;
    },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
    });

    $scope.deleteCard = function(index){
      $scope.showLoading();
      var cardId= $scope.cards[index].card.id
      conekta.deleteCard($scope.currentUser.conektaId, cardId).then(function(){
        $scope.cards.splice(index, 1);
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      }).finally($scope.hideLoading);
    }  

    $scope.showCardForm = function(view){
      $scope.cardFormView  = view;
    }

  }

})();
