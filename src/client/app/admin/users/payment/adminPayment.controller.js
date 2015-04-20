(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('AdminPayment', AdminPayment);

  AdminPayment.$inject = ['$scope','$stateParams','userApi','conekta'];

  function AdminPayment($scope,$stateParams, userApi, conekta) {
    var shell = $scope.shell;
    var view = $scope.view;
    var payment =  this;

    payment.cards = [];
    payment.cardFormView  = false;
    
    payment.error = false;
    $scope.loading = true;
    


    userApi.getCards({conektaId:view.user.conektaId})
    .then(function(cards){
      payment.cards = cards;
    }).finally(function(){
      $scope.loading = false;
    })

    payment.deleteCard = function(index){
      var card = payment.cards[parseInt(index)].card
      if(view.user.upgrade == 'upgraded' && card.id == view.user.subscriptionCard.card.id){
        payment.error = 'La tarjeta con terminacion '+card.last4+' se encuentra ligada a tu membresia, si deseas eliminarla, primero debes cancelar tu suscripcion.';
        return;
      }
      payment.error = false;
      shell.showLoading();
      conekta.deleteCard(view.user.conektaId, card.id).then(function(){
        payment.cards.splice(index, 1);
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    }  

    payment.showCardForm = function(view){
      payment.cardFormView  = view;
    }

  }

})();
