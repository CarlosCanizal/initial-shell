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

    userApi.getCards({conektaId:$scope.currentUser.conektaId}).then(function(result){
        console.log(result.result);
        $scope.cards = result.result;
    },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
    });

    $scope.deleteCard = function(index){
      var cardId= $scope.cards[index].id
      conekta.deleteCard($scope.currentUser.conektaId, cardId).then(function(){
        console.log('card deleted');
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }

    

  }

})();
