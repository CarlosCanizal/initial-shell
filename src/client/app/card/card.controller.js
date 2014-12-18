(function() {
  'use strict';

  angular
  .module('app.layout')
  .controller('Card', Card);

  Card.$inject = ['$scope','userApi'];

  function Card($scope, userApi, storage) {

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


    $scope.saveCard = function(){
      
      var conektaId = $scope.currentUser.conektaId;

      Conekta.setPublishableKey('key_LDjQwU7xkazYxSRSoW7XWfQ');
      var errorResponseHandler, successResponseHandler, tokenParams;
      tokenParams = {card:$scope.card};

      successResponseHandler = function(token) {
        
        userApi.addCard({conektaId:conektaId, token:token.id}).then(function(result){
          console.log(result.result);
        },function(error){
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      };

      errorResponseHandler = function(error) {
        // $scope.updating = false;
        return console.log(error.message);
      };
      // $scope.updating = true;
      Conekta.token.create(tokenParams, successResponseHandler, errorResponseHandler);

    };

  }

})();
