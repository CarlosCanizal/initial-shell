(function() {
  'use strict';

  angular
  .module('app.layout')
  .controller('Card', Card);

  Card.$inject = ['$scope','userApi'];

  function Card($scope, userApi) {

    $scope.card = {};

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
