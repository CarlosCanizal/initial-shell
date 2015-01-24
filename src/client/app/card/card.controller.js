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
    $scope.error = false;

    userApi.getCards({conektaId:$scope.currentUser.conektaId}).then(function(cards){
        console.log(cards);
        $scope.loading = false;
        $scope.cards = cards;
    },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
    });

    $scope.deleteCard = function(index){
      var card= $scope.cards[parseInt(index)].card
      if(card.id == $scope.currentUser.subscriptionCard.card.id){
        $scope.error = 'La tarjeta con terminacion '+card.last4+' se encuentra ligada a tu membrecia, si deseas eliminarla, primero debes cancelar tu suscripcion.';
        return;
      }
      $scope.error = false;
      $scope.showLoading();
      conekta.deleteCard($scope.currentUser.conektaId, card.id).then(function(){
        $scope.cards.splice(index, 1);
      },function(error){
        console.log(error);
        // console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      }).finally($scope.hideLoading);
    }  

    $scope.showCardForm = function(view){
      $scope.cardFormView  = view;
    }

  }

})();
