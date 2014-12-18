(function() {
  'use strict';

  angular
  .module('app.layout')
  .controller('Card', Card);

  Card.$inject = ['$scope','userApi','conekta'];

  function Card($scope, userApi, conekta) {

    $scope.card = {};
    // $scope.currentUser = userApi.currentUser();
    // $scope.setCurrentUser($scope.currentUser);
    console.log('here currentUser');
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

    $scope.saveCard = function(){
      conekta.saveCard($scope.currentUser.conektaId,$scope.card).then(function(card){
        console.log('card saved');
      },function(error){
        if(error.status)
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        else
          console.error(error);
      });
    };

  }

})();
