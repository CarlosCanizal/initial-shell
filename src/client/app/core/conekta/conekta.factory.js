(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('conekta', conekta);

  conekta.$inject = ['userApi','$q','parseheaders'];

  /* @ngInject */
  function conekta(userApi, $q, parseheaders) {

    var conketaPublicKey = "key_LDjQwU7xkazYxSRSoW7XWfQ";
    var  Conekta  = parse.newCloudCodeResource(parseheaders.storeKeys);

    return conekta = {
      saveCard : saveCard,
      deleteCard : deleteCard,
      updateMembership: updateMembership
    }

    function updateMembership(membership){

      var deferred = $q.defer();

      var user =  userApi.currentUser();
      userApi.saveProfile({membership: membership, objectId: user.objectId}).then(function(result){
        deferred.resolve(result);
      },function(error){
        console.error(error);
        deferred.reject(error);
      })

      return deferred.promise;
    }

    function suscribe(plan){

    }

    function deleteCard(conektaId, cardId){
      return userApi.deleteCard({conektaId:conektaId,cardId:cardId});
    }

    function saveCard(conektaId, card){
      var deferred = $q.defer();
      Conekta.setPublishableKey(conketaPublicKey);
      var errorResponseHandler,
          successResponseHandler,
          tokenParams;

      tokenParams = {card:card};

      successResponseHandler = function(token) {
        
        userApi.addCard({conektaId:conektaId, token:token.id}).then(function(result){
          deferred.resolve(result.result);
        },function(error){
          deferred.reject(error);
          //console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      };

      errorResponseHandler = function(error) {
        deferred.reject(error)
      };
      Conekta.token.create(tokenParams, successResponseHandler, errorResponseHandler);
      return deferred.promise;

    }

  }
})();
