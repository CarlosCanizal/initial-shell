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

    userApi.getCards({conektaId:$scope.currentUser.conektaId}).then(function(cards){
        console.log(cards);
        $scope.cards = cards;
    },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
    });

    $scope.deleteCard = function(index){
      var cardId= $scope.cards[index].card.id
      console.log(cardId);
      conekta.deleteCard($scope.currentUser.conektaId, cardId).then(function(){
        console.log('card deleted');
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }    

  }

})();
