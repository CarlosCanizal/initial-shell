(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('conekta', conekta);

  conekta.$inject = ['userApi','$q', 'parse','parseheaders'];

  /* @ngInject */
  function conekta(userApi, $q, parse, parseheaders) {

    var conketaPublicKey = "key_LDjQwU7xkazYxSRSoW7XWfQ";
    var  conektaResource  = parse.newCloudCodeResource(parseheaders.storeKeys);

    return conekta = {
      saveCard : saveCard,
      deleteCard : deleteCard,
      updateMembership: updateMembership,
      subcribe: subscribe,
      unsubscribe: unsubscribe,
      subscriptionCard: subscriptionCard
    }

    function updateMembership(membership, payment, user){

      if(!user)
        user =  userApi.currentUser();

      return subscribe(membership.id, payment.card.id, user.conektaId).then(function(){
        return userApi.logMembership({user: user.objectId, status:'active', notes:payment});
      }).then(function(){
        return userApi.saveUserProfile({objectId: user.objectId, membership: membership.name , upgrade:'upgraded',subscriptionCard:payment});
      });
      
    }

    function subscribe(plan, card, conektaId){
      var params = {plan: plan, card: card, conektaId: conektaId, "function":"subscribe"}
      return conektaResource.save(params).$promise;
    }

    function unsubscribe(card, plan, message, user){

      if(!user)
        user = userApi.currentUser();

      console.log(user.objectId);

      var params = {plan: plan, conektaId: user.conektaId, "function":"unsubscribe"}
      return conektaResource.save(params).$promise.then(function(){
        return userApi.logMembership({user: user.objectId, status:'cancelled',notes:{message:message}});
      }).then(function(){
        return userApi.saveUserProfile({objectId: user.objectId, membership: 'basic', upgrade:'cancelled'});
      });
    }

    function subscriptionCard(payment){
      var user =  userApi.currentUser();
      var conektaId = userApi.currentUser().conektaId;
      var params = { card:payment.card.id, conektaId: conektaId, "function":"subscriptionCard"}
      return conektaResource.save(params).$promise.then(function(){
        return userApi.logMembership({user: user.objectId, status:'updateCard', notes:payment});
      }).then(function(){
        return userApi.saveProfile({objectId: user.objectId, subscriptionCard:payment});
      });
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
