(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Payment', Payment);

  Payment.$inject = ['$scope','userApi','conekta'];

  function Payment($scope, userApi, conekta) {
    var shell = $scope.shell;
    var payment =  this;

    payment.cards = [];
    payment.cardFormView  = false;
    
    payment.error = false;
    $scope.loading = true;

    userApi.getCards({conektaId:shell.currentUser.conektaId}).then(function(cards){
        $scope.loading = false;
        payment.cards = cards;
    },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
    });

    payment.deleteCard = function(index){
      var card = payment.cards[parseInt(index)].card
      if(shell.currentUser.upgrade == 'upgraded' && card.id == shell.currentUser.subscriptionCard.card.id){
        payment.error = 'La tarjeta con terminacion '+card.last4+' se encuentra ligada a tu membrecia, si deseas eliminarla, primero debes cancelar tu suscripcion.';
        return;
      }
      payment.error = false;
      shell.showLoading();
      conekta.deleteCard(shell.currentUser.conektaId, card.id).then(function(){
        payment.cards.splice(index, 1);
      },function(error){
        console.log(error);
        // console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      }).finally(shell.hideLoading);
    }  

    payment.showCardForm = function(view){
      payment.cardFormView  = view;
    }

  }

})();
